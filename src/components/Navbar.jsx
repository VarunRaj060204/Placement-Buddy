import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/features', label: 'Features' },
    { to: '/about', label: 'About' },
    { to: '/chat', label: 'Start Interview', cta: true },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link to="/" className="nav-logo">
          <div className="nav-logo-icon">🎯</div>
          <span className="nav-logo-text">Placement<b>Buddy</b></span>
        </Link>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`nav-link ${l.cta ? 'nav-cta' : ''} ${location.pathname === l.to ? 'active' : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
        >
          <span/><span/><span/>
        </button>
      </div>
    </nav>
  );
}
