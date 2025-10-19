import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./reducers/selectedCountrySlice";

export const store = configureStore({
  reducer: {
    country: countryReducer,
  },
});
