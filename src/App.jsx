import { Routes, Route } from 'react-router-dom';
import Navbar_Day2 from './components/Navbar_Day2';
import Landing_Day1 from './pages/Landing_Day1';
import Login_Day1 from './pages/Login_Day1';
import Signup_Day2 from './pages/Signup_Day2';
import Dashboard_Day3 from './pages/Dashboard_Day3';
import Upload_Day3 from './pages/Upload_Day3';
import Results_Day4 from './pages/Results_Day4';

function App() {
  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* Persistent navigation bar */}
      <Navbar_Day2 />

      {/* Application routes */}
      <Routes>
        <Route path="/" element={<Landing_Day1 />} />
        <Route path="/login" element={<Login_Day1 />} />
        <Route path="/signup" element={<Signup_Day2 />} />
        <Route path="/dashboard" element={<Dashboard_Day3 />} />
        <Route path="/upload" element={<Upload_Day3 />} />
        <Route path="/results" element={<Results_Day4 />} />
      </Routes>
    </div>
  );
}

export default App;
