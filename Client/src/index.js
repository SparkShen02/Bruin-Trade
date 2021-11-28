import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./home";
import PageNotFound from "./404";
import SignupPage from "./signup";
import SellPage from "./sell"
import BuyPage from "./buy"
import ChangingPassword from "./change password";
import "./index.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<SignupPage />} />
          <Route exact path="*" element={<PageNotFound />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/sell" element={<SellPage />} />
          <Route exact path="/buy" element={<BuyPage />} />

          
          <Route exact path="/change_password" element={<ChangingPassword/>} />
        </Routes>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);