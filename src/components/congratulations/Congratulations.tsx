import React, { Component } from 'react';
import './Congratulations.scss';

export class Congratulations extends Component {
  render() {
    return (
        <div className='Congratulations'>
          <h4 >Awesome! You won!</h4>
          <h5>The game will restart in 5 seconds.</h5>
        </div>
    );
  }
}
