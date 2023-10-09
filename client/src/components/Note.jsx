const Note = ({ content, important, toggleImportance }) => {
  const label = important ? 'Make not important' : 'Make important';
  return (
    <li className="note">
      <p>{content}</p>
      <button
        className={`button ${important ? 'active' : 'not'}`}
        onClick={toggleImportance}
      >
        {label}
      </button>
    </li>
  );
};

export default Note;
