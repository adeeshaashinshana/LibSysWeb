import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import LoginPage from "./Pages/LoginPage";
import InfoPage from "./Pages/InfoPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="borrowInfo" element={<InfoPage />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p className="text-danger">404 Page not found</p>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
