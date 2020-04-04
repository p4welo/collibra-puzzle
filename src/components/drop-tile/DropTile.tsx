import React from 'react';
import { Tile } from 'model/tile.model';
import './DropTile.scss';

interface DropTileProps {
  tile: Tile;
  onDrop: (tileId: string) => void;
}

interface DropTileState {
  hovered: boolean
}

export class DropTile extends React.Component<DropTileProps, DropTileState> {

  state: DropTileState = {
    hovered: false
  };

  // @ts-ignore
  onDrop(e): void {
    e.preventDefault();
    const tileId = e.dataTransfer.getData('tile');
    this.setState({
      hovered: false
    })
    this.props.onDrop(tileId);
  }

  // @ts-ignore
  onDragOver(e): void {
    e.preventDefault();
    this.setState({
      hovered: true
    })
  }

  // @ts-ignore
  onDragLeave(e): void {
    e.preventDefault();
    this.setState({
      hovered: false
    })
  }

  get tileClass(): string {
    const isDone = this.props.tile.done;
    const isHovered = !isDone && this.state.hovered;

    return `
      DropTile
      ${isDone ? 'DropTile--done' : ''}
      ${isHovered ? 'DropTile--hovered' : ''}
    `;
  }

  render() {
    const { tile } = this.props;
    return (
        <div onDrop={this.onDrop.bind(this)}
            onDragOver={this.onDragOver.bind(this)}
            onDragLeave={this.onDragLeave.bind(this)}
            className={this.tileClass}>
          {/*{tile.id} {tile.done}*/}
        </div>
    );
  }
}
