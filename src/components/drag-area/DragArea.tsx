import React from 'react';

import { Tile } from 'model/tile.model';

import './DragArea.scss';

interface DragAreaProps {
  tiles: Tile[]
}

export class DragArea extends React.Component<DragAreaProps, any> {

  // @ts-ignore
  onDragStart(e, tile: Tile) {
    console.log('onDragStart', tile.id);
    e.dataTransfer.setData(`tile`, tile.id);
  }

  tileClass(tile: Tile, index: number): string {
    return `
      DragArea__drag-tile 
      DragArea__drag-tile--${index}
      ${tile.done ? 'DragArea__drag-tile--done' : ''}
    `;
  }

  render() {
    return (
        <div className='DragArea'>
          {this.props.tiles
              .map((tile, i) => (
                  <span className={this.tileClass(tile, i)}
                      key={i}
                      onDragStart={(e) => this.onDragStart(e, tile)}
                      draggable>
                {/*{tile.id}*/}
              </span>
              ))}
        </div>
    );
  }
}
