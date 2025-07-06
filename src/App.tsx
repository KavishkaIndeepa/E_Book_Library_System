import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import DefaultLayout from './View/Common/DefaultLayot/DefaultLayout';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/*' element={<DefaultLayout />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
