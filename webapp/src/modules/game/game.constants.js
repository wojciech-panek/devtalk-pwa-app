import { ANIMALS, FOOD } from '../../routes/home/game/game.constants';

export const GAME_COLLECTION = 'games';
export const NEW_GAME_DATA = {
  level: 0,
  coins: 0,
  fields: [
    {
      type: ANIMALS.chicken.type,
      position: 1,
      amount: 1,
      level: 1,
      foodType: FOOD.egg.type,
      foodAmount: 1,
      foodMaxAmount: 8,
    },
  ],
};
