import React from 'react';
import { render } from '@testing-library/react';
import { ScoreBoard } from '../ScoreBoard';

const scoreListMock: number[] = [
  10000,
  9000,
  8000,
  7000,
  11000
];

describe('ScoreBoard component', () => {
  it('should display all scores', () => {
    const { getAllByTestId } = render(<ScoreBoard scores={scoreListMock}/>);
    expect(getAllByTestId('score-row').length).toEqual(scoreListMock.length);
  });

  it('should display "No results" text when empty score list given', () => {
    const { queryByText } = render(<ScoreBoard scores={[]}/>);
    expect(queryByText('No results yet.')).toBeInTheDocument();
  });

  it('should not display "No results" text when filled score list given', () => {
    const { queryByText } = render(<ScoreBoard scores={scoreListMock}/>);
    expect(queryByText('No results yet.')).toBeNull();
  });

  it('should match snapshot', () => {
    const { container } = render(<ScoreBoard scores={scoreListMock}/>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
