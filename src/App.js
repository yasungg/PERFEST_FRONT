import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Board from "./pages/Board";
import WriteBoard from "./pages/WriteBoard";
import Ranking from "./pages/Ranking";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Board" element={<Board />} />
        <Route path="/WriteBoard" element={<WriteBoard />} />
        <Route path="/Ranking" element={<Ranking />} />

        
      </Routes>
    </Router>
  );
}

export default App;
