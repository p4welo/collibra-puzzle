import React, { Component } from 'react';
import './ScoreBoard.scss';
import { Score } from 'model';

interface ScoreBoardProps {
  scores: Score[];
}

export class ScoreBoard extends Component<ScoreBoardProps, any> {
  render() {
    const { scores = [] } = this.props;
    return (
        <>
          <h3>Scoreboard:</h3>
          {
            scores.length > 0 ?
                scores
                    .sort((score) => score.value)
                    .map((score: Score, i: number) =>
                        <p key={i}>
                          <strong>Place {i+1}</strong>: {score.value}ms
                        </p>
                    ) :
                <p>No results yet.</p>
          }
        </>
    );
  }
}
