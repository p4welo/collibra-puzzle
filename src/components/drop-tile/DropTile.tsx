import React, { DragEvent, Component } from 'react';
import { Tile } from 'model/tile.model';
import './DropTile.scss';

interface DropTileProps {
  tile: Tile;
  finished: boolean;
  onDrop: (tileId: string) => void;
}

interface DropTileState {
  hovered: boolean
}

export class DropTile extends Component<DropTileProps, DropTileState> {

  state: DropTileState = {
    hovered: false
  };

  shouldComponentUpdate(nextProps: Readonly<DropTileProps>, nextState: Readonly<DropTileState>): boolean {
    return this.state.hovered !== nextState.hovered ||
        this.props.finished !== nextProps.finished ||
        this.props.tile !== nextProps.tile
  }

  handleDrop(e: DragEvent): void {
    e.preventDefault();
    const tileId = e.dataTransfer.getData('tile');
    this.setState({
      hovered: false
    });
    this.props.onDrop(tileId);
  }

  handleDragOver(e: DragEvent): void {
    e.preventDefault();
    this.setState({
      hovered: true
    });
  }

  handleDragLeave(e: DragEvent): void {
    e.preventDefault();
    this.setState({
      hovered: false
    });
  }

  get tileClass(): string {
    const isDone = this.props.tile.done;
    const isFinished = this.props.finished;
    const isHovered = !isDone && this.state.hovered;

    return `
      DropTile
      ${isDone ? 'DropTile--done' : ''}
      ${isFinished ? 'DropTile--finished' : ''}
      ${isHovered ? 'DropTile--hovered' : ''}
    `;
  }

  render() {
    return (
        <div onDrop={this.handleDrop.bind(this)}
            onDragOver={this.handleDragOver.bind(this)}
            onDragLeave={this.handleDragLeave.bind(this)}
            className={this.tileClass}
        />
    );
  }
}
