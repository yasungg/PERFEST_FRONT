import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Payment from "./pages/Payments";
import MyPage from "./pages/MyPage";
import SideBar from "./pages/Sidebar";
import Board from "./pages/Board";
import WriteBoard from "./pages/WriteBoard";
import Ranking from "./pages/Ranking";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
