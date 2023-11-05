import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Togglable from '../Togglable';

describe('<Togglable />', () => {
  let container;

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv">togglable content</div>
      </Togglable>
    ).container;
  });

  test('renders its children', async () => {
    await screen.findAllByText('togglable content');
  });

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent');
    expect(div).toHaveClass('hidden');
    expect(div).not.toHaveClass('block');
  });

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('show...');
    await user.click(button);

    const div = container.querySelector('.togglableContent');
    expect(div).toHaveClass('block');
    expect(div).not.toHaveClass('hidden');
  });

  test('toggled content can be closed', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('show...');
    await user.click(button);

    const closeButton = screen.getByText('cancel');
    await user.click(closeButton);

    const div = container.querySelector('.togglableContent');
    expect(div).toHaveClass('hidden');
  });
});
