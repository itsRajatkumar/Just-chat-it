import ChatComp from "./Pages/ChatComp";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Reset from "./Components/Reset/Reset";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<ChatComp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset" element={<Reset />} />
        </Routes>
      </Router>
  );
}

export default App;
