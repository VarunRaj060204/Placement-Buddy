import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Features from './pages/Features';
import About from './pages/About';
import Chat from './pages/Chat';
import './index.css';

function AppInner() {
  const location = useLocation();
  const isChat = location.pathname === '/chat';

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about"    element={<About />} />
        <Route path="/chat"     element={<Chat />} />
      </Routes>
      {!isChat && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
