import React from "react";
import { Route, Routes } from "react-router-dom";
import Todos from "./components/Todos";
import Signup from "./components/Signup";
import Login from "./components/Login";
import "./App.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Todos />} />
        <Route exact path="/todos" element={<Todos />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
