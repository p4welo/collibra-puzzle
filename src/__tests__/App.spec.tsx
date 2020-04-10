import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import App from 'App';
import { doneTilesMock, freshTilesMock } from 'model/__mocks__/tile';

describe('App component', () => {
  let wrapper: ShallowWrapper;
  let componentInstance: App;

  beforeEach(() => {
    jest.useFakeTimers();
    wrapper = shallow(<App/>);
    componentInstance = wrapper.instance() as App;
  });

  describe('on init', () => {
    it('should generate random tile order', () => {
      const orderedOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      expect(wrapper.state('tileOrder')).not.toStrictEqual(orderedOrder);
    });

    it('should set time to 0', () => {
      expect(wrapper.state('time')).toBe(0);
    });

    it('should not be started', () => {
      expect(wrapper.state('started')).toBeFalsy();
    });
  });

  it('should increase time penalty when tile is placed incorrectly', () => {
    componentInstance.handleTileDrop('1', '2');
    expect(wrapper.state('penalty')).toBe(5000);
  });

  it('should not increase time penalty when tile is placed correctly', () => {
    componentInstance.handleTileDrop('1', '1');
    expect(wrapper.state('penalty')).toBe(0);
  });

  describe('when the first tile is dragged', () => {
    beforeEach(() => {
      const tiles = [...freshTilesMock];
      componentInstance.setState({ tiles });
      componentInstance.handleTileDrag();
    });

    it('should start game when tile is dragged', () => {
      expect(wrapper.state('started')).toBeTruthy();
    });

    it('should start the timer', () => {
      expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1);
    });
  });

  describe('when the game is in progress', () => {
    const storedDate = global.Date;
    const currentTime = 100000;

    beforeEach(() => {
      const dateMock = Object.create(global.Date);
      dateMock.now = () => currentTime;
      global.Date = dateMock;
    });

    it('should increase the time by penalty time', () => {
      const startedAt = 10;
      const penalty = 5000;
      componentInstance.setState({
        startedAt,
        penalty
      });
      componentInstance.tick();
      expect(wrapper.state('time')).toEqual(currentTime - startedAt + penalty);
    });

    afterEach(() => {
      global.Date = storedDate;
    });
  });

  describe('when placing the last tile on correct place', () => {
    beforeEach(() => {
      const tiles = [...doneTilesMock];
      tiles[6].done = false;
      componentInstance.setState({
        tiles,
        time: 10000,
        scoreboard: []
      });
      componentInstance.handleTileDrop('6', '6');
    });

    it('should stop the timer', () => {
      expect(clearInterval).toHaveBeenCalledTimes(1);
    });

    it('should wait 5 seconds until game resets', () => {
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000);
    });

    it('should set time back to 0 on reset', () => {
      componentInstance.resetGame();
      expect(wrapper.state('time')).toEqual(0);
    });

    it('should submit score to scoreboard', () => {
      const scoreBoard: number[] = wrapper.state('scoreboard');
      expect(scoreBoard.length).toEqual(1);
      expect(scoreBoard[0]).toEqual(10000);
    });
  });

  it('should stop the timer on component unmount', () => {
    wrapper.unmount();
    expect(clearInterval).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.useRealTimers();
  });
});
