import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddNoteForm from '../AddNoteForm';
import userEvent from '@testing-library/user-event';
import noteService from '../../services/notes';

// Mockolja a noteService.create függvényt
jest.mock('../../services/notes');

test('does not render this', () => {
  const note = {
    content: 'This is a reminder',
    important: true,
  };

  render(<AddNoteForm note={note} />);

  const element = screen.queryByText('do not want this thing to be rendered');
  expect(element).toBeNull();
});

test('<AddNoteForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup();

  // Mockolja a noteService.create válaszát
  noteService.create = jest.fn().mockResolvedValue({
    content: 'testing a form...',
    important: false,
  });

  const setNotes = jest.fn();
  const setErrorMessage = jest.fn();
  const noteFormRef = {
    current: {
      toggleVisibility: jest.fn(),
    },
  };

  render(
    <AddNoteForm
      setNotes={setNotes}
      setErrorMessage={setErrorMessage}
      noteFormRef={noteFormRef}
    />
  );

  //   const input = screen.getByPlaceholderText('Add a note');

  const input = screen.getByRole('textbox');

  //   const input = container.querySelector('#note-input');
  const sendButton = screen.getByText('submit');

  await user.type(input, 'testing a form...');
  await user.click(sendButton);

  expect(noteService.create.mock.calls).toHaveLength(1);
  expect(noteService.create.mock.calls[0][0].content).toBe('testing a form...');
  expect(noteFormRef.current.toggleVisibility).toHaveBeenCalled();
});
