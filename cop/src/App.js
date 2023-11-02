
import React from "react";
import { Router, Route, Switch, BrowserRouter, Routes } from "react-router-dom";
import Signup from "./components/Login";

import Home from "./components/Home"; // Create this component

function App() {
  return (
    <h1>app</h1>
    // <Signup/>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" component={<Home />} />
    //     <Route path="/signup" element={<Signup />} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
