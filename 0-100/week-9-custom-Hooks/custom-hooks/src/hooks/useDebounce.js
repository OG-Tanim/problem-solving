import { useState } from "react";

const useDebounce = (value) => {
  const [state, setState] = useState({});

  useEffect(() => {
    const timeoutId = setTimeout(
      axios.fetch("https://some-site?sreachInput=" + value).then((res) => {
        setState(res.data);
      }),
      1000,
    );

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value]);

  return state;
};

export default useDebounce;
