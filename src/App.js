import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Payment from "./pages/Payments";
import MyPage from "./pages/MyPage";
import SideBar from "./pages/Sidebar";
import Board from "./pages/Board";
import WriteBoard from "./pages/WriteBoard";
import PayResultFalse from "./pages/PayResultFalse"
import Ranking from "./pages/Ranking";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/Sidebar" element={<SideBar />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/resultfalse" element={<PayResultFalse />} />
        <Route path="/Board" element={<Board />} />
        <Route path="/WriteBoard" element={<WriteBoard />} />
        <Route path="/Ranking" element={<Ranking />} />
      </Routes>
    </Router>
  );
}

export default App;
