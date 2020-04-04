import React from 'react';
import './App.scss';
import {
  DragArea,
  DropArea
} from 'components';
import { Tile } from 'model/tile.model';

interface AppState {
  tiles: Tile[];
  initialized: boolean;
}

export default class App extends React.Component<any, AppState> {

  initialState: AppState = {
    tiles: new Array(9).fill(9).map((v, i) => ({ id: String(i), done: false })),
    initialized: false
  };

  state: AppState = this.initialState;

  resetGame(): void {
    this.setState(this.initialState);
  }

  startTimer(): void {
    console.log('starting timer...');
    this.setState({
      initialized: true
    });
  }

  increaseTimer(): void {
    console.log('increasing timer...');
  }

  setTileAsDone(tileId: string): void {
    this.setState(prevState => ({
      tiles: prevState.tiles.map(
          (tile: Tile) => tile.id === tileId ? { ...tile, done: true } : tile
      )
    }));
  }

  onTileDrop(sourceId: string, destinationId: string) {
    if (!this.state.initialized) {
      this.startTimer();
    }

    if (sourceId === destinationId) {
      this.setTileAsDone(sourceId);
    } else {
      this.increaseTimer();
    }

    // TODO: sprawdzic czy gra skonczona i zresetowac po X sekundach
  }

  render() {
    return (
        <div className="App">
          <div className='App__drop-area'>
            <DropArea tiles={this.state.tiles} onDrop={this.onTileDrop.bind(this)}/>
          </div>
          <DragArea tiles={this.state.tiles}></DragArea>
        </div>
    );
  }
}
