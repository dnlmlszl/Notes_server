import { useState, forwardRef, useImperativeHandle } from 'react';
import Button from './Button';

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div className={`${visible ? 'hidden' : 'block'}`}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div className={`${visible ? 'block' : 'hidden'} togglableContent`}>
        {props.children}
        <Button onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';

export default Togglable;
