import { countAtom, evenSelector } from "./store/atoms/count";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <CountWrapper />
    </RecoilRoot>
  );
}

function CountWrapper() {
  return (
    <div>
      <CountRenderer />
      <Buttons />
      <IsEven />
    </div>
  );
}

function CountRenderer() {
  const count = useRecoilValue(countAtom);
  return <div>{count}</div>;
}

function IsEven() {
  const even = useRecoilValue(evenSelector);
  return <div>{even === 0 ? "true" : "false"}</div>;
}

function Buttons() {
  const setCount = useSetRecoilState(countAtom);
  return (
    <div>
      <button
        onClick={() => {
          setCount((c) => c + 1);
        }}
      >
        Increment
      </button>

      <button
        onClick={() => {
          setCount((c) => c - 1);
        }}
      >
        Decrement
      </button>
    </div>
  );
}

export default App;
