import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Content } from "./components";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Content />}>
          {" "}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
