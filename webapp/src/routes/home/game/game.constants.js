import foodBeefTexture from '../../../images/game/food/food-beef.png';
import foodCheeseTexture from '../../../images/game/food/food-cheese.png';
import foodChickenTexture from '../../../images/game/food/food-chicken.png';
import foodDuckTexture from '../../../images/game/food/food-duck.png';
import foodEggTexture from '../../../images/game/food/food-egg.png';
import foodFrameTexture from '../../../images/game/food/food-frame.png';
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
export const FENCES_INITIAL_Y = 250;
export const UI_RADIUS = 10;
export const ANIMAL_MIN_LEVEL = 1;
export const ANIMAL_MAX_LEVEL = 10;
export const ANIMAL_MIN_AMOUNT = 1;
export const ANIMAL_MAX_AMOUNT = 10;

export const ANIMALS = {
  buffalo: { type: 'buffalo', texture: animalBuffaloTexture },
  chicken: { type: 'chicken', texture: animalChickenTexture },
  chick: { type: 'chick', texture: animalChickTexture },
  cow: { type: 'cow', texture: animalCowTexture },
  duck: { type: 'duck', texture: animalDuckTexture },
  goat: { type: 'goat', texture: animalGoatTexture },
  moose: { type: 'moose', texture: animalMooseTexture },
  pig: { type: 'pig', texture: animalPigTexture },
};

export const FOOD = {
  beef: { type: 'beef', cost: 1, texture: foodBeefTexture },
  cheese: { type: 'cheese', cost: 1, texture: foodCheeseTexture },
  chicken: { type: 'chicken', cost: 1, texture: foodChickenTexture },
  duck: { type: 'duck', cost: 1, texture: foodDuckTexture },
  egg: { type: 'egg', cost: 1, texture: foodEggTexture },
  frame: { type: 'frame', cost: 1, texture: foodFrameTexture },
  ham: { type: 'ham', cost: 1, texture: foodHamTexture },
  milk: { type: 'milk', cost: 1, texture: foodMilkTexture },
  moose: { type: 'moose', cost: 1, texture: foodMooseTexture },
};
