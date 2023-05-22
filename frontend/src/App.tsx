import "./App.css";
import Continents from "./Components/Continents";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Countries from "./Components/Countries";
import Country from "./Components/Country";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Continents />} />
        <Route path="/continent/:continentCode" element={<Countries />} />
        <Route path="/:countryCode" element={<Country />} />

      </Routes>
    </Router>
  );
};

export default App;
