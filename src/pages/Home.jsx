import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MODES } from '../config/prompts';
import './Home.css';

function StatCard({ value, label }) {
  return (
    <div className="stat-card">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function Tag({ children, color }) {
  return <span className="tag" style={{ '--c': color }}>{children}</span>;
}

const steps = [
  { n: '01', icon: '\u{1F3AF}', title: 'Choose Interview Mode', desc: 'Select from DSA, HR, or System Design based on the round you are preparing for.' },
  { n: '02', icon: '\u{1F4AC}', title: 'Answer Questions', desc: 'The AI asks one question at a time — just like a real interviewer. Take your time and think.' },
  { n: '03', icon: '\u{1F4CB}', title: 'Get Instant Feedback', desc: 'After each answer, receive structured feedback: strengths, improvements, and the ideal answer.' },
  { n: '04', icon: '\u{1F680}', title: 'Level Up', desc: 'Questions progressively increase in difficulty, mirroring actual placement interview patterns.' },
];

export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handler = e => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      el.style.setProperty('--mx', x + 'px');
      el.style.setProperty('--my', y + 'px');
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <div className="home">

      <section className="hero" ref={heroRef}>
        <div className="hero-grid-bg" />
        <div className="hero-blobs">
          <div className="blob b1" /><div className="blob b2" /><div className="blob b3" />
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            AI-Powered Interview Prep
          </div>
          <h1 className="hero-title">
            Crack your<br/>
            <span className="gradient-text">placement interview</span><br/>
            with confidence.
          </h1>
          <p className="hero-sub">
            Practice DSA, HR and System Design interviews with an AI interviewer that gives
            real-time structured feedback and ideal answers — one question at a time.
          </p>
          <div className="hero-actions">
            <Link to="/chat" className="btn-primary">Start Interview Free <span className="btn-arrow">→</span></Link>
            <Link to="/features" className="btn-ghost">See How It Works</Link>
          </div>
          <div className="hero-stats">
            <StatCard value="3" label="Interview Modes" />
            <div className="stat-divider" />
            <StatCard value="AI" label="Powered Feedback" />
            <div className="stat-divider" />
            <StatCard value="∞" label="Practice Sessions" />
          </div>
        </div>

        <div className="hero-card">
          <div className="card-header">
            <div className="card-dots">
              <span style={{background:'#ff5f57'}}/><span style={{background:'#ffbd2e'}}/><span style={{background:'#28c840'}}/>
            </div>
            <span className="card-title-bar">placement_buddy.ai</span>
          </div>
          <div className="card-body">
            <div className="card-line ai">
              <span className="line-avatar">🎯</span>
              <div className="line-bubble">What is the time complexity of Binary Search?</div>
            </div>
            <div className="card-line user">
              <div className="line-bubble user-bubble">O(log n) — it halves the search space each step.</div>
              <span className="line-avatar">👤</span>
            </div>
            <div className="card-line ai">
              <span className="line-avatar">🎯</span>
              <div className="line-bubble feedback-bubble">
                <span className="fb-tag green">✅ Strengths</span> Correct! Great concise answer.<br/>
                <span className="fb-tag amber">⚡ Improve</span> Mention it requires a sorted array.<br/>
                <span className="fb-tag purple">🎯 Next</span> Now implement it in code.
              </div>
            </div>
            <div className="card-cursor">
              <span className="cursor-dot" />
              <span className="cursor-text">Waiting for your answer...</span>
            </div>
          </div>
        </div>
      </section>

      <section className="modes-section">
        <div className="section-inner">
          <div className="section-label">INTERVIEW MODES</div>
          <h2 className="section-title">Choose your battleground</h2>
          <p className="section-sub">Three distinct interview formats, each crafted to match real placement rounds.</p>
          <div className="modes-grid">
            {Object.values(MODES).map(m => (
              <div
                key={m.key}
                className="mode-card"
                style={{ '--mc': m.color }}
                onClick={() => navigate('/chat', { state: { mode: m.key } })}
              >
                <div className="mode-card-top">
                  <div className="mode-icon">{m.icon}</div>
                  <div className="mode-meta">
                    <Tag color={m.color}>{m.difficulty}</Tag>
                    <Tag color="var(--text-3)">{m.duration}</Tag>
                  </div>
                </div>
                <h3 className="mode-title">{m.label}</h3>
                <p className="mode-desc">{m.desc}</p>
                <div className="mode-topics">
                  {m.topics.map(t => <span key={t} className="topic-chip">{t}</span>)}
                </div>
                <div className="mode-cta">Start {m.short} Interview <span>→</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="how-section">
        <div className="section-inner">
          <div className="section-label">HOW IT WORKS</div>
          <h2 className="section-title">Simple. Structured. Effective.</h2>
          <div className="steps">
            {steps.map((s, i) => (
              <div className="step" key={i}>
                <div className="step-number">{s.n}</div>
                <div className="step-icon">{s.icon}</div>
                <h4 className="step-title">{s.title}</h4>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div className="cta-glow" />
          <h2 className="cta-title">Ready to ace your next interview?</h2>
          <p className="cta-sub">No sign-up required. Start practicing in seconds.</p>
          <Link to="/chat" className="btn-primary large">Launch Interview Now →</Link>
        </div>
      </section>

    </div>
  );
}
