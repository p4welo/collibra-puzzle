import React, { Component } from 'react';
import './Timer.scss';

interface TimerProps {
  time: number
}

export class Timer extends Component<TimerProps> {
  render() {
    return (
        <div className='Timer'>
          <h3>Your time:</h3>
          <h2>{this.props.time} ms</h2>
        </div>
    );
  }
}
