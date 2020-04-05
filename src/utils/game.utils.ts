import { Tile } from 'model/tile.model';

export const isGameFinished = (tiles: Tile[] = []) =>
    tiles.filter((tile: Tile) => !tile.done).length < 1;
