const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment');
const { toPairs, map, pipe, mergeAll, complement, isNil, filter, equals, keys, isEmpty } = require('ramda');

const serviceAccount = require("./devtalk-pwa-app-firebase-adminsdk-r7k5l-71d8c8d952");

const WAREHOUSE_MAX_AMOUNT_LEVELS = {
  1: 10,
  2: 20,
  3: 50,
  4: 100,
  5: 200,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://devtalk-pwa-app.firebaseio.com"
});

function mapFields(fields) {
  const mapped = fields.map(field => {
    console.log(field);
    if(field.amount === 0) {
      return null;
    }

    const amount = field.amount;
    const productionDuration = field.amount;

    const currentWarehouseAmount = field.foodAmount;
    const maxWarehouseAmount = WAREHOUSE_MAX_AMOUNT_LEVELS[field.warehouseLevel] || 10;

    const itemsToProduct = maxWarehouseAmount - currentWarehouseAmount;

    if (itemsToProduct === 0) {
      return true;
    }

    const startedAt = moment(field.startProductionTimestamp);
    const iterationsToFull = itemsToProduct / amount;
    const secondsToFull = iterationsToFull * productionDuration;

    const fullAt = startedAt.clone().add(secondsToFull, 'seconds');

    return moment().isSameOrAfter(fullAt);
  })

  const filtered = mapped.filter(complement(isNil));

  return filtered.indexOf(false) === -1;
}

exports.sendNotifications = functions.https.onRequest((request, response) => {
  admin.database().ref('/games').once('value').then(gamesSnapshot => {
    const games = gamesSnapshot.val()
    const fullGames = pipe(
      toPairs,
      map(item => ({ [item[0]]: mapFields(item[1].fields) })),
      mergeAll,
      filter(equals(true)),
      keys
    )(games)
    console.log(fullGames);


    const promises = fullGames.map(gameId => admin.database().ref('notifications/' + gameId).once('value'));

    Promise.all(promises).then(snapshots => {
      const games = snapshots.map(snapshot => {
        const object = Object.assign({}, snapshot.val());
        object.id = snapshot.key;
        return object;
      }).filter(complement(isNil));
      const availableToSend = games.filter(
        i => (
          (i.fcmToken && !i.lastSentAt) ||
          (
            i.fcmToken &&
            i.lastSentAt &&
            moment().isAfter(moment(i.lastSentAt).add(5, 'minutes'))
          )
        )
      );

      const ids = availableToSend.map(i => i.id);
      const tokens = availableToSend.map(i => i.fcmToken);

      if (isEmpty(tokens)) {
        response.sendStatus(200);
      }

      admin.messaging().sendToDevice(tokens, {
        notification: {
          title: "Big Farm",
          body: "Your warehouse is full!",
          click_action: "https://devtalk-pwa.netlify.com"
        },
        data: {
          title: "Big Farm",
          body: "Your warehouse is full!",
        }
      }).then(() => {
        const idsPromises = ids.map(id => admin.database().ref('notifications/' + id + '/lastSentAt').set(moment().toISOString()));

        Promise.all(idsPromises).then(() => {
          response.sendStatus(200);
        });
      })
    });
    // response.sendStatus(200);
  });
});
