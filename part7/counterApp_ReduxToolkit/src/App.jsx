import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, zero } from "./reducers/counterSlice";
function App() {
  const count = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(zero())}>Zero</button>
    </>
  );
}

export default App;
