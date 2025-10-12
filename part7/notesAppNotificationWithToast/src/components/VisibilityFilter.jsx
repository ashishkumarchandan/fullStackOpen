import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../reducers/filterSlice";

const VisibilityFilter = () => {
  const dispatch = useDispatch();
  const current = useSelector((state) => state.filter);
  const filters = ["ALL", "IMPORTANT", "NONIMPORTANT"];

  return (
    <div>
      <h3>Filter notes</h3>
      {filters.map((f) => (
        <label key={f} style={{ marginRight: "1rem" }}>
          <input
            type="radio"
            name="filter"
            value={f}
            checked={current === f}
            onChange={() => dispatch(setFilter(f))}
          />
        </label>
      ))}
    </div>
  );
};

export default VisibilityFilter;
