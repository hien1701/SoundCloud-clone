import { useState } from "react";

interface IProps {
  name: string;
  age: number;
  info: {
    gender: string;
    address: string;
  };
  onPressSave?: (name: string) => void;
  listTodo: string[];
  setListTodo?: (todo: string[]) => void;
}

const InputTodo = (props: IProps) => {
  const { listTodo, setListTodo } = props;
  const [count, setCount] = useState(1);
  const [todo, setTodo] = useState("");

  const handleClick = () => {
    if (!todo) {
      alert("Empty todo!");
      return;
    }
    if (props?.onPressSave) {
      props?.onPressSave(todo);
    }
    if (setListTodo) {
      setListTodo([...listTodo, todo]);
    }
    setTodo("");
  };

  const handleIncrease = () => {
    setCount(count + 1);
  };

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid gray",
      }}
    >
      <div>
        <text style={{ marginRight: 10 }}>Count : {count}</text>
        <button
          onClick={() => {
            handleIncrease();
          }}
        >
          Increase
        </button>
      </div>
      <text>Add new {props.name}</text>
      <div style={{ border: "1px solid red" }}>
        <input
          type="text"
          placeholder="Add todo"
          style={{ width: "300px", height: "30px" }}
          onChange={(event) => handleChangeText(event)}
          value={todo}
        />
        <button
          onClick={() => {
            handleClick();
          }}
        >
          Save
        </button>
        <br />
        {/* <ul>
          {listTodo.map((todo, index) => {
            return <li key={`${todo}_${index}`}>{todo}</li>;
          })}
        </ul> */}
      </div>
    </div>
  );
};

export default InputTodo;
