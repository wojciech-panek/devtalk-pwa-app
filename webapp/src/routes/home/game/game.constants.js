import foodBeefTexture from '../../../images/game/food/food-beef.png';
import foodCheeseTexture from '../../../images/game/food/food-cheese.png';
import foodChickenTexture from '../../../images/game/food/food-chicken.png';
import foodDuckTexture from '../../../images/game/food/food-duck.png';
import foodEggTexture from '../../../images/game/food/food-egg.png';
import foodHamTexture from '../../../images/game/food/food-ham.png';
import foodMilkTexture from '../../../images/game/food/food-milk.png';
import foodMooseTexture from '../../../images/game/food/food-moose.png';

import animalBuffaloTexture from '../../../images/game/animals/animal-buffalo.png';
import animalChickenTexture from '../../../images/game/animals/animal-chicken.png';
import animalChickTexture from '../../../images/game/animals/animal-chick.png';
import animalCowTexture from '../../../images/game/animals/animal-cow.png';
import animalDuckTexture from '../../../images/game/animals/animal-duck.png';
import animalGoatTexture from '../../../images/game/animals/animal-goat.png';
import animalMooseTexture from '../../../images/game/animals/animal-moose.png';
import animalPigTexture from '../../../images/game/animals/animal-pig.png';

export const FENCES_COLUMNS = 2;
export const FENCES_ROWS = 4;
export const FENCES_INITIAL_Y = 215;
export const UI_RADIUS = 10;

export const ANIMALS = {
  chicken: {
    type: 'chicken',
    texture: animalChickenTexture,
    cost: 50,
  },
  chick: {
    type: 'chick',
    texture: animalChickTexture,
    cost: 100,
  },
  cow: {
    type: 'cow',
    texture: animalCowTexture,
    cost: 150,
  },
  duck: {
    type: 'duck',
    texture: animalDuckTexture,
    cost: 200,
  },
  goat: {
    type: 'goat',
    texture: animalGoatTexture,
    cost: 250,
  },
  moose: {
    type: 'moose',
    texture: animalMooseTexture,
    cost: 300,
  },
  pig: {
    type: 'pig',
    texture: animalPigTexture,
    cost: 400,
  },
  buffalo: {
    type: 'buffalo',
    texture: animalBuffaloTexture,
    cost: 500,
  },
};

export const FOOD = {
  beef: {
    type: 'beef',
    cost: 10,
    texture: foodBeefTexture,
  },
  cheese: {
    type: 'cheese',
    cost: 2,
    texture: foodCheeseTexture,
  },
  chicken: {
    type: 'chicken',
    cost: 3,
    texture: foodChickenTexture,
  },
  duck: {
    type: 'duck',
    cost: 4,
    texture: foodDuckTexture,
  },
  egg: {
    type: 'egg',
    cost: 1,
    texture: foodEggTexture,
  },
  ham: {
    type: 'ham',
    cost: 5,
    texture: foodHamTexture,
  },
  milk: {
    type: 'milk',
    cost: 2,
    texture: foodMilkTexture,
  },
  moose: {
    type: 'moose',
    cost: 8,
    texture: foodMooseTexture,
  },
};

export const WAREHOUSE_LEVELS = {
  1: { foodMaxAmount: 10, upgradeCost: 100 },
  2: { foodMaxAmount: 20, upgradeCost: 200 },
  3: { foodMaxAmount: 50, upgradeCost: 500 },
  4: { foodMaxAmount: 100, upgradeCost: 1000 },
  5: { foodMaxAmount: 200, upgradeCost: 2000 },
};
