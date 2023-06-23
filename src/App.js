import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import SideBar from "./pages/Sidebar";
import MyRanking from "./pages/MyRanking";
import MySetting from "./pages/MySetting";
import MyReview from "./pages/MyReview";
import MyReserveList from "./pages/MyReserveList";
import MyPayList from "./pages/MyPayList";
import MyWrite from "./pages/MyWrite";
import Board from "./pages/Board";
import WriteBoard from "./pages/WriteBoard";
import Ranking from "./pages/Ranking";
import UpdateBoard from "./pages/UpdateBoard";
import BoardArticle from "./pages/BoardArticle";
import { PayReady, PayResult } from "./pages/Payments";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/MyRanking" element={<MyRanking />} />
        <Route path="/Setting" element={<MySetting />} />
        <Route path="/MyReview" element={<MyReview />} />
        <Route path="/ReserveList" element={<MyReserveList />} />
        <Route path="/PayList" element={<MyPayList />} />
        <Route path="/MyWrite" element={<MyWrite />} />
        <Route path="/payment" element={<PayReady />} />
        <Route path="/success" element={<PayResult />} />
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
