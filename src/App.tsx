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
          listTodo={listTodo}
          setListTodo={setListTodo}
        />
        <ul>
          {listTodo.map((todo, index) => {
            return <li key={`${todo}_${index}`}>{todo}</li>;
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
