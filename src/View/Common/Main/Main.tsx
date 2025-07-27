import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../../Components/Home/Home'
import About from '../../Components/About/About'
import Library from '../../Components/Library/Library'
import Contact from '../../Components/Contact/Contact'
import BookDetail from '../../Components/Library/BookDetail'
import ScrollToTop from '../../Components/ScrollToTop'

export default function Main() {
  return (
    <>  
    <ScrollToTop />
      <Routes>
        <Route path="/" Component={Home}></Route>
        <Route path="/about" Component={About}></Route>
        <Route path="/library" Component={Library}></Route>
        <Route path="/contact" Component={Contact}></Route>
        <Route path="/book/:id" element={<BookDetail />} />
      </Routes>
    </>
  );
}
