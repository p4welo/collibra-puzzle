import { doneTilesMock, freshTilesMock } from 'model/__mocks__/tile';
import { getShuffledOrder, isGameFinished } from '../game.utils';

describe('isGameFinished', () => {
  it('should return true when all tiles are done', () => {
    const tiles = doneTilesMock;
    expect(isGameFinished(tiles)).toBeTruthy();
  });

  it('should return false when one of tiles is not done', () => {
    const tiles = doneTilesMock;
    tiles[0].done = false;
    expect(isGameFinished(tiles)).toBeFalsy();
  });

  it('should return false when tiles are not done', () => {
    const tiles = freshTilesMock;
    expect(isGameFinished(tiles)).toBeFalsy();
  });
});

describe('getShuffledOrder', () => {
  it('should return an array of given amount', () => {
    const amount = 9;
    expect(getShuffledOrder(amount).length).toBe(amount);
  });

  it('should generate filled array with unique elements', () => {
    const amount = 9;
    const result: any = {};
    getShuffledOrder(amount)
        .forEach((element: number) => {
          expect(result[element]).toBeFalsy();
          result[element] = true;
        });
    expect(Object.keys(result).length).toEqual(amount);
  })
});
