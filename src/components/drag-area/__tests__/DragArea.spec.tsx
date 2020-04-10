import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { doneTilesMock, tileOrderMock } from 'model/__mocks__/tile';
import { DragArea } from '../DragArea';

describe('DragArea component', () => {
  let wrapper: ShallowWrapper;
  let componentInstance: DragArea;
  const onDragStartMock = jest.fn();

  beforeEach(() => {
    const tiles = [...doneTilesMock];
    tiles[1].done = false;

    wrapper = shallow(<DragArea tiles={tiles} order={[...tileOrderMock]}
        onDragStart={onDragStartMock}/>);
    componentInstance = wrapper.instance() as DragArea;
  });

  it('should render all tiles', () => {
    expect(wrapper.find('.DragArea__drag-tile').length).toEqual(9);
  });

  it('should call onDragStart when tile is dragged', () => {
    const dragEventMock = { dataTransfer: { setData: jest.fn() } };
    wrapper.find('.DragArea__drag-tile').at(0).simulate('dragStart', dragEventMock);
    expect(onDragStartMock).toHaveBeenCalled();
  });
});
