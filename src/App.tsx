import { useState } from "react";
import "./App.scss";
import InputTodo from "./test/InputTodo";

function App() {
  const [listTodo, setListTodo] = useState([
    "todo 1",
    "todo 2",
    "todo 3",
    "todo 4",
  ]);
  const name = "Todo";
  const age = 0;
  const info = {
    gender: "male",
    address: "GV",
  };

  const handlePress = (name: string) => {
    alert(name);
  };

  return (
    <>
      <div>
        <InputTodo
          name={name}
          age={age}
          info={info}
          // onPressSave={handlePress}
          listTodo={listTodo}
          setListTodo={setListTodo}
        />
        <ul>
          {listTodo.map((todo, index) => {
            return <li key={`${todo}_${index}`}>{todo}</li>;
          })}
        </ul>
        {/* <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Hello world</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p> */}
      </div>
      {/* <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;
