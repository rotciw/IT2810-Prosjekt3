import React from 'react';
import Button from '../components/button/Button.js';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<Button className="test" onClick="test.onClick">test</Button>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
