import "./App.css";
import Continents from "./Components/Continents";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Countries from "./Components/Countries";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Continents />} />
        <Route path="/continent/:continentName" element={<Countries />} />
      </Routes>
    </Router>
  );
};

export default App;
