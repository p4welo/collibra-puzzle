import React, { Component } from 'react';
import { DropTile } from '../drop-tile';
import { Tile } from 'model/tile.model';
import './DropArea.scss';

interface DropAreaProps {
  tiles: Tile[];
  onDrop: (sourceId: string, destinationId: string) => void;
}

export class DropArea extends Component<DropAreaProps, any> {

  renderTile(tile: Tile, index: number) {
    return <DropTile key={index}
        tile={tile}
        onDrop={(id) => this.props.onDrop(id, tile.id)}/>;
  }

  render() {
    return (
        <div className='DropArea'>
          {this.props.tiles.map((tile, i) => this.renderTile(tile, i))}
        </div>
    );
  }
}
