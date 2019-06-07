import React from 'react';
import { shallow } from 'enzyme';

import { IconComponent as Icon } from '../icon.component';


describe('Icon: Component', () => {
  const defaultProps = {
  };

  const component = (props) => (
    <Icon {...defaultProps} {...props} />
  );

  const render = (props = {}) => shallow(component(props));

  it('should render correctly', () => {
    const wrapper = render();
    global.expect(wrapper).toMatchSnapshot();
  });
});
