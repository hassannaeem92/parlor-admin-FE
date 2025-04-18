import { useEffect, useRef } from "react";

const InputFocus = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return inputRef;
};

export default InputFocus;
