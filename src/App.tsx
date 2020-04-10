import React, { Component } from 'react';

import './App.scss';
import {
  Congratulations,
  DragArea,
  DropArea,
  ScoreBoard,
  Timer
} from 'components';
import { Tile } from 'model';
import { getShuffledOrder, isGameFinished } from 'utils/game.utils';

interface AppState {
  tiles: Tile[];
  tileOrder: number[];
  started: boolean;
  scoreboard: number[]
  time: number;
  penalty: number;
  startedAt: number;
}

export default class App extends Component<{}, AppState> {
  initialState: AppState = {
    tiles: new Array(9)
        .fill(9)
        .map((v, i) => ({ id: String(i), done: false })),
    tileOrder: getShuffledOrder(9),
    started: false,
    scoreboard: [],
    penalty: 0,
    time: 0,
    startedAt: 0
  };

  state: AppState = this.initialState;

  private timer: any;

  startGame(): void {
    this.setState(prevState => ({
      started: true,
      time: prevState.time,
      startedAt: Date.now() - prevState.time
    }));

    this.timer = setInterval(() => this.tick(), 1);
  }

  tick(): void {
    this.setState(({ startedAt, penalty }) => ({
      time: Date.now() - startedAt + penalty
    }));
  }

  stopTimer(): void {
    clearInterval(this.timer);
  }

  resetGame(): void {
    this.setState((prevState) => ({
      ...this.initialState,
      tileOrder: getShuffledOrder(9),
      scoreboard: prevState.scoreboard
    }));
  }

  increasePenalty(): void {
    this.setState((prevState: AppState) => ({
      penalty: prevState.penalty + 5000
    }));
  }

  setTileAsDone(tileId: string): void {
    this.setState(prevState => ({
      tiles: prevState.tiles.map(
          (tile: Tile) => tile.id === tileId ? { ...tile, done: true } : tile
      )
    }), () => {
      if (isGameFinished(this.state.tiles)) {
        this.onGameFinish();
      }
    });
  }

  handleTileDrag = () => {
    if (!this.state.started) {
      this.startGame();
    }
  };

  handleTileDrop(sourceId: string, destinationId: string): void {
    if (sourceId === destinationId) {
      this.setTileAsDone(sourceId);
    } else {
      this.increasePenalty();
    }
  }

  onGameFinish(): void {
    this.stopTimer();
    this.saveScore();
    setTimeout(() => this.resetGame(), 5000);
  }

  saveScore(): void {
    this.setState((prevState: AppState) => ({
      scoreboard: [
        ...prevState.scoreboard,
        prevState.time
      ]
    }));
  }

  render() {
    const isFinished = isGameFinished(this.state.tiles);
    return (
        <div className="App">
          <div className="App__game-content">
            <Timer time={this.state.time}/>

            <DropArea tiles={this.state.tiles}
                finished={isFinished}
                onDrop={this.handleTileDrop.bind(this)}
            />

            <Congratulations finished={isFinished}/>

            <DragArea tiles={this.state.tiles}
                order={this.state.tileOrder}
                onDragStart={this.handleTileDrag}
            />
          </div>

          <div className="App__game-results">
            <ScoreBoard scores={this.state.scoreboard}/>
          </div>
        </div>
    );
  }

  componentWillUnmount() {
    this.stopTimer();
  }
}
