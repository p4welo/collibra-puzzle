import React, { DragEvent, Component } from 'react';

import { Tile } from 'model/tile.model';

import './DragArea.scss';

interface DragAreaProps {
  tiles: Tile[],
  order: number[],
  onDragStart: (tileId: string) => void
}

export class DragArea extends Component<DragAreaProps> {

  shouldComponentUpdate(nextProps: DragAreaProps): boolean {
    return this.props.tiles !== nextProps.tiles;
  }

  handleDragStart(e: DragEvent, tile: Tile): void {
    e.dataTransfer.setData(`tile`, tile.id);
    this.props.onDragStart(tile.id);
  }

  tileClass(tile: Tile): string {
    return `
      DragArea__drag-tile 
      DragArea__drag-tile--${tile.id}
      ${tile.done ? 'DragArea__drag-tile--done' : ''}
    `;
  }

  render() {
    return (
        <div className='DragArea'>
          {
            this.props.order
                .map((id: number) => this.props.tiles[id])
                .map((tile: Tile, i: number) => (
                    <span className={this.tileClass(tile)}
                        key={i}
                        onDragStart={(e: DragEvent) => this.handleDragStart(e, tile)}
                        draggable
                    ></span>
                ))
          }
        </div>
    );
  }
}
