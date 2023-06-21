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
import UpdateBoard from "./pages/UpdateBoard";
import BoardArticle from "./pages/BoardArticle";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/Sidebar" element={<SideBar />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/Board" element={<Board />} />
        <Route path="/WriteBoard" element={<WriteBoard />} />
        <Route path="/UpdateBoard" element={<UpdateBoard />} />
        <Route path="/Ranking" element={<Ranking />} />
        <Route path="/BoardArticle" element={<BoardArticle />} />
      </Routes>
    </Router>
  );
}

export default App;
