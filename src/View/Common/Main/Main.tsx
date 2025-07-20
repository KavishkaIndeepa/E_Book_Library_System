import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../../Components/Home/Home'
import About from '../../Components/About/About'
import Library from '../../Components/Library/Library'
import Blog from '../../Components/Blog/Blog'
import Contact from '../../Components/Contact/Contact'
import Login from '../../Components/Login/Login'
import SignUp from '../../Components/SignUp/SignUp'
import BookDetail from '../../Components/Library/BookDetail'

export default function Main() {
  return (
    <Routes>
      <Route path='/' Component={Home}></Route>
      <Route path='/about' Component={About}></Route>
      <Route path='/library' Component={Library}></Route>
      <Route path='/blog' Component={Blog}></Route>
      <Route path='/contact' Component={Contact}></Route>
      <Route path="/book/:id" element={<BookDetail />} />

    </Routes>
  )
}
