import React from 'react';
import { shallow } from 'enzyme';

import { Instruction } from '../instruction.component';


describe('Instruction: Component', () => {
  const defaultProps = {
  };

  const component = (props) => (
    <Instruction {...defaultProps} {...props} />
  );

  const render = (props = {}) => shallow(component(props));

  it('should render correctly', () => {
    const wrapper = render();
    global.expect(wrapper).toMatchSnapshot();
  });
});
