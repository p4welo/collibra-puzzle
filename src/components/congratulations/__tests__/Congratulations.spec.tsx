import React from 'react';
import { shallow } from 'enzyme';
import { Congratulations } from '../Congratulations';

describe('Congratulations component', () => {
  it('should display success message when the game is finished', () => {
    const wrapper = shallow(<Congratulations finished={true}/>);
    expect(wrapper.contains(<h4>Awesome! You won!</h4>)).toBeTruthy();
  });

  it('should not display success message when the game is in progress', () => {
    const wrapper = shallow(<Congratulations finished={false}/>);
    expect(wrapper.contains(<h4>Awesome! You won!</h4>)).toBeFalsy();
  });
});
