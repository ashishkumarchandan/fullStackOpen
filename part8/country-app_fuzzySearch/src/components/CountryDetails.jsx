import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedCountry } from "../reducers/selectedCountrySlice";

const CountryDetails = () => {
  const selected = useSelector((state) => state.country.selectedCountry);
  const dispatch = useDispatch();

  if (!selected) return <p>Click a country to see details 👇</p>;

  // Convert objects to readable lists
  const languages = selected.languages
    ? Object.values(selected.languages).join(", ")
    : "N/A";

  const currencies = selected.currencies
    ? Object.values(selected.currencies)
        .map((c) => `${c.name} (${c.symbol})`)
        .join(", ")
    : "N/A";

  const neighbors = selected.borders || [];

  return (
    <div style={{ padding: "1rem", border: "1px solid #aaa" }}>
      <h2>{selected.name.common} {selected.flag}</h2>
      <p><b>Official Name:</b> {selected.name.official}</p>
      <p><b>Capital:</b> {selected.capital?.[0] || "N/A"}</p>
      <p><b>Region:</b> {selected.region} / {selected.subregion}</p>
      <p><b>Population:</b> {selected.population?.toLocaleString()}</p>
      <p><b>Area:</b> {selected.area?.toLocaleString()} km²</p>
      <p><b>Languages:</b> {languages}</p>
      <p><b>Currencies:</b> {currencies}</p>
      <p>
        <b>Timezones:</b> {selected.timezones?.join(", ")}
      </p>
      <p><b>Start of Week:</b> {selected.startOfWeek}</p>

      {neighbors.length > 0 && (
        <p>
          <b>Neighboring Countries:</b>{" "}
          {neighbors.map((code) => (
            <span
              key={code}
              style={{ cursor: "pointer", textDecoration: "underline", marginRight: "0.5rem" }}
              onClick={() => {
                const allCountries = window.allCountries || [];
                const neighbor = allCountries.find((c) => c.cca3 === code);
                if (neighbor) dispatch(setSelectedCountry(neighbor));
              }}
            >
              {code}
            </span>
          ))}
        </p>
      )}

      {selected.flags && (
        <img
          src={selected.flags.svg || selected.flags.png}
          alt={selected.name.common}
          style={{ width: "150px", marginTop: "0.5rem" }}
        />
      )}

      {selected.maps?.googleMaps && (
        <p>
          <a href={selected.maps.googleMaps} target="_blank" rel="noreferrer">
            Google Maps Link
          </a>
        </p>
      )}
    </div>
  );
};

export default CountryDetails;
