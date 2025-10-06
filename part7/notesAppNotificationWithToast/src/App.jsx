import { ToastContainer } from "react-toastify";
import "./App.css";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";

function App() {
  return (
    <>
      <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
        <h1>Notes App</h1>
        <VisibilityFilter />
        <Notes />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
}

export default App;
