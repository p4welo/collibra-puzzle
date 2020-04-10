import { Tile } from '../tile.model';

export const tileMock: Tile = {
  id: '0',
  done: false
};

export const doneTileMock: Tile = {
  id: '1',
  done: true
};

export const freshTilesMock: Tile[] = [
  { id: '0', done: false },
  { id: '1', done: false },
  { id: '2', done: false },
  { id: '3', done: false },
  { id: '4', done: false },
  { id: '5', done: false },
  { id: '6', done: false },
  { id: '7', done: false },
  { id: '8', done: false }
];

export const doneTilesMock: Tile[] = [
  { id: '0', done: true },
  { id: '1', done: true },
  { id: '2', done: true },
  { id: '3', done: true },
  { id: '4', done: true },
  { id: '5', done: true },
  { id: '6', done: true },
  { id: '7', done: true },
  { id: '8', done: true }
];

export const tileOrderMock: number[] = [
    0,1,2,3,4,5,6,7,8
];
