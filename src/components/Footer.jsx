import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="footer-logo-icon">🎯</div>
            <span>Placement<b>Buddy</b></span>
          </div>
          <p className="footer-tagline">
            AI-powered mock interviews for placement-ready students.
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h5>Product</h5>
            <Link to="/features">Features</Link>
            <Link to="/chat">Start Interview</Link>
            <Link to="/about">About</Link>
          </div>
          <div className="footer-col">
            <h5>Interview Modes</h5>
            <Link to="/chat">DSA Interview</Link>
            <Link to="/chat">HR Interview</Link>
            <Link to="/chat">System Design</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2025 PlacementBuddy · Built as a Final Year Project</span>
        <span className="footer-built">Made with ❤️ for students</span>
      </div>
    </footer>
  );
}
