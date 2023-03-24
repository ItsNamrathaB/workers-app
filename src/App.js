import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Worker from "./pages/Worker/Worker";
import Home from "./pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/worker" element={<Worker />} />
        <Route exact path="/worker/:workerId" element={<Worker />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
