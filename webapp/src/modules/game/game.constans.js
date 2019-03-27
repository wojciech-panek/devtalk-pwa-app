import { ANIMALS, FOOD } from '../../routes/home/game/game.constans';

export const GAME_COLLECTION = 'games';
export const NEW_GAME_DATA = {
  level: 0,
  coins: 0,
  fields: [
    {
      type: ANIMALS.chicken,
      foodType: FOOD.egg,
      position: 1,
      amount: 1,
      level: 1,
    },
  ],
};
