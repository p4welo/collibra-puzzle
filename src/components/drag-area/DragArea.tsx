import React, { Component, DragEvent } from 'react';

import { Tile } from 'model/tile.model';

import './DragArea.scss';

interface DragAreaProps {
  tiles: Tile[],
  started: boolean;
  onDragStart: (tileId: string) => void
}

export class DragArea extends Component<DragAreaProps, any> {

  // componentDidMount(): void {
  //   this.shuffle();
  // }

  // componentDidUpdate(prevProps: Readonly<DragAreaProps>, prevState: Readonly<any>, snapshot?: any): void {
  //   if (prevProps.started !== this.props.started) {
  //     console.log('started', prevProps.started, this.props.started);
  //   }
  // }

  handleDragStart(e: DragEvent, tile: Tile): void {
    e.dataTransfer.setData(`tile`, tile.id);
    this.props.onDragStart(tile.id);
  }

  // shuffle(): void {
  //
  // }

  tileClass(tile: Tile): string {
    return `
      DragArea__drag-tile 
      DragArea__drag-tile--${tile.id}
      ${tile.done ? 'DragArea__drag-tile--done' : ''}
    `;
  }


  // .sort(() => 0.5 - Math.random())

  render() {
    console.log('render');
    return (
        <div className='DragArea'>
          {this.props.tiles
              .map((tile, i) => (
                  <span className={this.tileClass(tile)}
                      key={i}
                      onDragStart={(e: DragEvent) => this.handleDragStart(e, tile)}
                      draggable
                  >{tile.id}</span>
              ))}
        </div>
    );
  }
}
