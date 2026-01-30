// import "tailwindcss";

import "./App.css";

function App() {
  return (
    <>
      <div className="md:flex justify-start flex-wrap">
        <div className="bg-red-500 w-[40%]">
          hi
          <br />
          hi again
        </div>
        <div className="bg-green-500 w-[40%]">hi</div>
        <div className="bg-blue-500 w-[20%]">hi</div>
        <div className="bg-yellow-500 w-[60%]">hi</div>
      </div>
      <div class="grid grid-cols-10">
        <div className="bg-red-500 col-span-4">hi</div>
        <div className="bg-green-500 col-span-4">hi</div>
        <div className="bg-blue-500 col-span-2">hi</div>
        <div className="bg-yellow-500 col-span-6">hi</div>
      </div>
      \
      <div class="md:grid grid-cols-3">
        <div className="bg-red-500 ">hi</div>
        <div className="bg-green-500 ">hi</div>
        <div className="bg-blue-500 ">hi</div>
        <div className="bg-yellow-500">hi</div>
      </div>
    </>
  );
}

export default App;
