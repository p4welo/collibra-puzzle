import { Tile } from 'model/tile.model';
import { range } from 'ramda';

export const isGameFinished = (tiles: Tile[] = []) =>
    tiles.filter((tile: Tile) => !tile.done).length < 1;

export const getShuffledOrder = (amount: number) => {
  return range(0, amount)
      .sort((a, b) => 0.5 - Math.random());
};
