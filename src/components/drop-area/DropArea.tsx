import React, { Component } from 'react';
import { DropTile } from '../drop-tile';
import { Tile } from 'model/tile.model';
import './DropArea.scss';

interface DropAreaProps {
  tiles: Tile[];
  finished: boolean;
  onDrop: (sourceId: string, destinationId: string) => void;
}

export class DropArea extends Component<DropAreaProps> {

  shouldComponentUpdate(nextProps: DropAreaProps): boolean {
    return this.props.tiles !== nextProps.tiles;
  }

  renderTile(tile: Tile, index: number) {
    return <DropTile key={index}
        tile={tile}
        finished={this.props.finished}
        onDrop={(id) => this.props.onDrop(id, tile.id)}/>;
  }

  render() {
    return (
        <div className='DropArea'>
          {this.props.tiles
              // .sort((t1, t2) => +t1.id - +t2.id)
              .map((tile, i) => this.renderTile(tile, i))}
        </div>
    );
  }
}
