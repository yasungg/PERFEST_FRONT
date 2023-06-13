import './App.css';
import { Route, Router, Routes } from 'react-router';
import Home from './pages/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path ="/" element={<Home/>} />
      </Routes>
    </Router>
  )
}

export default App;
