import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Note from '../Note';

test('renders content', async () => {
  const content = 'Component testing is done with react-testing-library';
  const important = true;
  const mockHandler = jest.fn();

  render(
    <Note
      content={content}
      important={important}
      toggleImportance={mockHandler}
    />
  );

  const user = userEvent.setup();
  const button = screen.getByText('Make not important');
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);

  //   screen.debug(element);

  //   const element = screen.getByText(
  //     'Component testing is done with react-testing-library'
  //   );
  //   expect(element).toBeDefined();
});
