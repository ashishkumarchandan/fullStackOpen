import "./App.css";
import CountryDetails from "./components/CountryDetails";
import CountryList from "./components/CountryList";

function App() {
  return (
    <>
      <div style={{ padding: "2rem", display: "flex", gap: "2rem" }}>
        <div style={{ flex: 1, maxHeight: "80vh", overflowY: "auto"}}>
          <h1>🌍 Countries Explorer</h1>
          <CountryList />
        </div>
        <div style={{ flex: 1 }}>
          <CountryDetails />
        </div>
      </div>
    </>
  );
}

export default App;
