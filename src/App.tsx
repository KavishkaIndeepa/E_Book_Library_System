import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./View/Common/DefaultLayot/DefaultLayout";
import Login from "./View/Components/Login/Login";
import SignUp from "./View/Components/SignUp/SignUp";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/*" element={<DefaultLayout />}></Route>
        <Route path="/login" Component={Login}></Route>
        <Route path="/signup" Component={SignUp}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
