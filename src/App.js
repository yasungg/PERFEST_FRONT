import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Payment from "./pages/Payments";
import MyPage from "./pages/MyPage";
import SideBar from "./pages/Sidebar";
import MyRanking from "./pages/MyRanking";
import MySetting from "./pages/MySetting";
import MyReview from "./pages/MyReview";
import MyReserveList from "./pages/MyReserveList";
import MyPayList from "./pages/MyPayList";
import MyWrite from "./pages/MyWrite";

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
        <Route path="/Payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
