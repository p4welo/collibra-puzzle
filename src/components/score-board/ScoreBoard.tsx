import React, { PureComponent } from 'react';
import './ScoreBoard.scss';
import { Score } from 'model';

interface ScoreBoardProps {
  scores: Score[];
}

export class ScoreBoard extends PureComponent<ScoreBoardProps> {

  render() {
    const { scores = [] } = this.props;
    return (
        <div className='ScoreBoard'>
          <h3 className='ScoreBoard__header'>Scoreboard:</h3>

          <table className='ScoreBoard__table'>
            <thead>
            <tr>
              <th>Attempt No</th>
              <th>Time</th>
            </tr>
            </thead>

            <tbody>
            {
              scores.length > 0 ?
                  scores
                      .map((score: Score, i: number) =>
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{score.value} ms</td>
                          </tr>
                      ) :

                  <tr>
                    <td colSpan={2}>No results yet.</td>
                  </tr>
            }
            </tbody>
          </table>
        </div>
    );
  }
}
