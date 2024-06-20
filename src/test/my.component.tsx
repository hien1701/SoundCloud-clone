import { sayHi } from "./say";

const MyFirstComponent = () => {
  const myName = "Hien Dinh";
  return (
    <div>
      My First Component
      <text style={{ color: "red", marginLeft: 10 }}>{myName}</text>
      <button onClick={sayHi}>This is my button</button>
    </div>
  );
};
export default MyFirstComponent;
