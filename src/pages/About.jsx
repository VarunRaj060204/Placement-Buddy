import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const techStack = [
  { name: 'React 18', role: 'Frontend Framework', icon: '⚛️' },
  { name: 'React Router v6', role: 'Client-side Routing', icon: '🔀' },
  { name: 'Claude Sonnet API', role: 'AI Interview Engine', icon: '🤖' },
  { name: 'CSS Custom Properties', role: 'Design System', icon: '🎨' },
  { name: 'Anthropic SDK', role: 'API Communication', icon: '🔌' },
  { name: 'Google Fonts', role: 'Typography', icon: '🔤' },
];

const timeline = [
  { phase: 'Phase 1', title: 'Research & Planning', desc: 'Studied placement interview patterns across top companies. Identified three critical interview types for engineering students.', icon: '🔍' },
  { phase: 'Phase 2', title: 'Prompt Engineering', desc: 'Designed and iterated on the AI system prompt to produce structured, consistent, interviewer-style feedback.', icon: '🧠' },
  { phase: 'Phase 3', title: 'UI/UX Design', desc: 'Built a dark-themed, terminal-inspired interface that feels professional yet approachable for students.', icon: '🎨' },
  { phase: 'Phase 4', title: 'Development & Testing', desc: 'Implemented the full React app with routing, multi-mode chat, and real API integration. Tested across devices.', icon: '⚙️' },
];

const goals = [
  { icon: '🎯', title: 'Bridge the gap', desc: 'Most students know the theory but freeze in actual interviews. We fix that with structured practice.' },
  { icon: '🤖', title: 'Leverage AI', desc: 'Use large language models not as a search engine, but as a structured evaluator that mimics real human interviewers.' },
  { icon: '📈', title: 'Progressive learning', desc: 'Build genuine confidence through progressively harder questions — not just random Q&A.' },
  { icon: '🆓', title: 'Free & accessible', desc: 'Every student deserves access to quality interview prep, regardless of whether they can afford coaching.' },
];

export default function About() {
  return (
    <div className="about-page">

      {/* ── HERO ── */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <div className="section-label">ABOUT THE PROJECT</div>
          <h1 className="about-title">
            Built by students,<br/>
            <span className="gradient-text">for students.</span>
          </h1>
          <p className="about-sub">
            Placement Buddy is a Final Year Project that tackles one of the biggest
            challenges for engineering students — knowing the answers but failing
            the interview. We built an AI interviewer that actually trains you.
          </p>
        </div>

        <div className="about-mission-card">
          <div className="mission-label">Our Mission</div>
          <blockquote>
            "To give every engineering student a fair chance at cracking placement interviews —
            through structured AI-powered practice that simulates real interview conditions."
          </blockquote>
        </div>
      </section>

      {/* ── PROBLEM & SOLUTION ── */}
      <section className="ps-section">
        <div className="section-inner two-col">
          <div className="ps-card problem">
            <div className="ps-icon">❌</div>
            <h3>The Problem</h3>
            <ul>
              <li>Students study theory but don't practice speaking answers aloud</li>
              <li>Mock interviews require scheduling, availability, and cost money</li>
              <li>YouTube videos don't give personalized feedback</li>
              <li>Practice platforms test code, not interview communication</li>
              <li>No tool mimics the structured, one-question-at-a-time format</li>
            </ul>
          </div>
          <div className="ps-card solution">
            <div className="ps-icon">✅</div>
            <h3>Our Solution</h3>
            <ul>
              <li>AI interviewer that stays strictly in role — no casual chatting</li>
              <li>Available 24/7, zero scheduling, completely free</li>
              <li>Real-time feedback on every answer with ideal answers provided</li>
              <li>Covers all three interview types: DSA, HR, System Design</li>
              <li>Progressive difficulty that mirrors actual placement rounds</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── GOALS ── */}
      <section className="goals-section">
        <div className="section-inner">
          <div className="section-label">PROJECT GOALS</div>
          <h2 className="section-title">What we set out to build</h2>
          <div className="goals-grid">
            {goals.map((g, i) => (
              <div className="goal-card" key={i}>
                <div className="goal-icon">{g.icon}</div>
                <h4>{g.title}</h4>
                <p>{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEVELOPMENT TIMELINE ── */}
      <section className="timeline-section">
        <div className="section-inner">
          <div className="section-label">DEVELOPMENT JOURNEY</div>
          <h2 className="section-title">How we built it</h2>
          <div className="timeline">
            {timeline.map((t, i) => (
              <div className="tl-item" key={i}>
                <div className="tl-left">
                  <div className="tl-phase">{t.phase}</div>
                  <div className="tl-icon">{t.icon}</div>
                </div>
                <div className="tl-line">
                  <div className="tl-dot" />
                  {i < timeline.length - 1 && <div className="tl-connector" />}
                </div>
                <div className="tl-right">
                  <h4>{t.title}</h4>
                  <p>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="tech-section">
        <div className="section-inner">
          <div className="section-label">TECH STACK</div>
          <h2 className="section-title">Built with</h2>
          <div className="tech-grid">
            {techStack.map((t, i) => (
              <div className="tech-card" key={i}>
                <span className="tech-icon">{t.icon}</span>
                <div>
                  <div className="tech-name">{t.name}</div>
                  <div className="tech-role">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI PROMPT NOTE ── */}
      <section className="prompt-note-section">
        <div className="section-inner">
          <div className="prompt-note-card">
            <div className="pn-left">
              <div className="pn-icon">🧠</div>
              <div>
                <h3>Powered by Prompt Engineering</h3>
                <p>
                  The core of this project is a carefully designed system prompt that transforms
                  Claude into a strict, structured technical interviewer. The prompt enforces
                  one-question-at-a-time flow, feedback format, and adaptive difficulty —
                  all without fine-tuning or training.
                </p>
              </div>
            </div>
            <Link to="/chat" className="btn-primary">See it in action →</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
