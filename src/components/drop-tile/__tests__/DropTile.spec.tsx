import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { tileMock, doneTileMock } from 'model/__mocks__/tile';
import { DropTile } from '../DropTile';

describe('DropTile component', () => {
  it('should have .DropTile--done class when tile is placed correctly', () => {
    const { getByTestId } = render(<DropTile tile={{ ...doneTileMock }} finished={false}
        onDrop={jest.fn()}/>);
    expect(getByTestId('drop-tile')).toHaveClass('DropTile--done');
  });

  it('should not have .DropTile--done class when tile is not placed correctly', () => {
    const { getByTestId } = render(<DropTile tile={{ ...tileMock }} finished={false}
        onDrop={jest.fn()}/>);
    expect(getByTestId('drop-tile')).not.toHaveClass('DropTile--done');
  });

  it('should have .DropTile--finished class when the game is finished', () => {
    const { getByTestId } = render(<DropTile tile={{ ...doneTileMock }} finished={true}
        onDrop={jest.fn()}/>);
    expect(getByTestId('drop-tile')).toHaveClass('DropTile--finished');
  });

  it('should have .DropTile--hovered class when is hovered by some tile and no done yet', () => {
    const { getByTestId } = render(<DropTile tile={{ ...tileMock }} finished={false}
        onDrop={jest.fn()}/>);
    fireEvent.dragOver(getByTestId('drop-tile'));
    expect(getByTestId('drop-tile')).toHaveClass('DropTile--hovered');

    fireEvent.dragLeave(getByTestId('drop-tile'));
    expect(getByTestId('drop-tile')).not.toHaveClass('DropTile--hovered');
  });

  it('should match snapshot when the game is finished', () => {
    const { container } = render(<DropTile tile={{ ...doneTileMock }} finished={true}
        onDrop={jest.fn()}/>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should match snapshot when the game is not finished and tile is placed correctly', () => {
    const { container } = render(<DropTile tile={{ ...doneTileMock }} finished={false}
        onDrop={jest.fn()}/>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should match snapshot when the game is not finished and tile is not placed correctly', () => {
    const { container } = render(<DropTile tile={{ ...tileMock }} finished={false}
        onDrop={jest.fn()}/>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
