import ChatComp from "./Pages/ChatComp";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Reset from "./Components/Reset/Reset";
import { Provider } from 'react-redux';
import store from './Redux/store';
import Toasts from "./Components/PopupToasts/Toats";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<ChatComp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset" element={<Reset />} />
        </Routes>
      </Router>
      <Toasts />
    </Provider>
  );
}

export default App;
