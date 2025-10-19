import axios from "axios";

export const fetchAllCountries = async () => {
  const { data } = await axios.get(
    "https://studies.cs.helsinki.fi/restcountries/api/all"
  );
  return data;
};
