import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useCountries } from "../hooks/useCountriesQuery";
import { setSelectedCountry } from "../reducers/selectedCountrySlice";

const CountryList = () => {
  const { data, isLoading, error } = useCountries();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  if (isLoading) return <p>Loading countries...</p>;
  if (error) return <p>Failed to fetch countries 😢</p>;

  const filteredCountries = data.filter((c) =>
    c.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search countries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "0.5rem",
          marginBottom: "1rem",
          width: "100%",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredCountries.map((country) => (
          <li
            key={country.cca3}
            onClick={() => dispatch(setSelectedCountry(country))}
            style={{
              cursor: "pointer",
              padding: "8px",
              borderBottom: "1px solid #ccc",
            }}
          >
            {country.name.common} {country.flag}
          </li>
        ))}
      </ul>
      {filteredCountries.length === 0 && <p>No countries found 😢</p>}
    </div>
  );
};

export default CountryList;
