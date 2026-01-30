import { use, useEffect } from "react";

function useInterval(fn, t) {
  let intId;

  useEffect(() => {
    intId = setInterval(() => {
      fn();
    }, t);

    return () => {
      clearInterval(intId);
    };
  }, []);
}

export default useInterval;
