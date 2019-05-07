import React from 'react';
import { shallow } from 'enzyme';

import { NewGameFormComponent as NewGameForm } from '../newGameForm.component';


describe('NewGameForm: Component', () => {
  const defaultProps = {
  };

  const component = (props) => (
    <NewGameForm {...defaultProps} {...props} />
  );

  const render = (props = {}) => shallow(component(props));

  it('should render correctly', () => {
    const wrapper = render();
    global.expect(wrapper).toMatchSnapshot();
  });
});
