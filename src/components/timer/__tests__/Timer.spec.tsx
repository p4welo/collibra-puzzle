import React from 'react';
import { render } from '@testing-library/react';
import { Timer } from '../Timer';

describe('Timer component', () => {
  it('should display current user time', () => {
    const time = 12345;
    const { queryByText } = render(<Timer time={time}/>);
    expect(queryByText(`12345 ms`)).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const time = 12345;
    const { container } = render(<Timer time={time}/>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
