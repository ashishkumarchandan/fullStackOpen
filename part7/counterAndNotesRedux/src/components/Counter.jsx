import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, reset } from "../reducers/counterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(reset())}> reset</button>
    </div>
  );
};

export default Counter;
