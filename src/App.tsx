import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./View/Common/DefaultLayot/DefaultLayout";
import Login from "./View/Components/Login/Login";
import SignUp from "./View/Components/SignUp/SignUp";
import UserDashboard from "./View/Components/UserDashboard/UserDashboard";
import AdminDashboard from "./View/Components/AdminDashboard/AdminDashboard";
import Dashboard from "./View/Components/UserDashboard/Dashboard/Dashboard";
import Books from "./View/Components/UserDashboard/Books/Books";
import Profile from "./View/Components/UserDashboard/Profile/Profile";
import Favourites from "./View/Components/UserDashboard/Favourites/Favourites";
import Cart from "./View/Components/UserDashboard/Cart/Cart";
import MainDashboard from "./View/Components/AdminDashboard/Dashdoard/MainDashboard";
import Payment from "./View/Components/UserDashboard/Payment/Payment";
import Members from "./View/Components/AdminDashboard/Members/Members";
import AdminBooks from "./View/Components/AdminDashboard/AdminBooks/AdminBooks";
import AddBooks from "./View/Components/AdminDashboard/AdminBooks/AddBooks";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/*" element={<DefaultLayout />}></Route>
        <Route path="/login" Component={Login}></Route>
        <Route path="/signup" Component={SignUp}></Route>
        <Route path="/user-dashboard" element={<UserDashboard />}>
          <Route index element={<Dashboard />} />
          <Route path="books" element={<Books />} />
          <Route path="profile" element={<Profile />} />
          <Route path="favourites" element={<Favourites />} />
          <Route path="cart" element={<Cart />} />
          <Route path="payment" element={<Payment />} />
        </Route>
        <Route path="/admin-dashboard" element={<AdminDashboard />}> 
        <Route index element={<MainDashboard />} />
          <Route path="members" element={<Members />} />
          <Route path="books" element={<AdminBooks />} />
          <Route path="add-books" element={<AddBooks />} />
          <Route path="add-books/:id" element={<AddBooks />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
