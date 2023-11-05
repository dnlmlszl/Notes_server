const Button = ({ className, onClick, type, children }) => {
  return (
    <button className={`px-4 py-2 ${className}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
