import { useState, forwardRef, useImperativeHandle } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Button from './Button';

const Modal = forwardRef(({ children, buttonLabel }, refs) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });
  return (
    <>
      <Button
        onClick={toggleVisibility}
        className="py-2 px-4 bg-blue-500 text-white rounded"
      >
        {buttonLabel}
      </Button>
      {isVisible && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded relative w-1/2 h-1/2">
            {children}
            <Button
              onClick={toggleVisibility}
              className="absolute top-2 right-2 mt-4 py-2 px-4 bg-red-500 hover:bg-red-700 text-white rounded"
            >
              <AiOutlineClose />
            </Button>
          </div>
        </div>
      )}
    </>
  );
});

Modal.displayName = 'Togglable';

export default Modal;
