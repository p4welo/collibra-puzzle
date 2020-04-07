import React, { PureComponent } from 'react';
import './Congratulations.scss';

interface CongratulationsProps {
  finished: boolean
}

export class Congratulations extends PureComponent<CongratulationsProps> {
  render() {
    if (this.props.finished) {
      return (
          <div className='Congratulations'>
            <h4>Awesome! You won!</h4>
            <h5>The game will restart in 5 seconds.</h5>
          </div>
      );
    } else {
      return <></>;
    }
  }
}
