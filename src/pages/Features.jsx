import React from 'react';
import { Link } from 'react-router-dom';
import './Features.css';

const features = [
  { icon: '\u{1F3AF}', title: 'One Question at a Time', desc: 'Mirrors a real interview. The AI asks one focused question, waits for your answer, and evaluates before moving on.', color: 'var(--accent)' },
  { icon: '\u{1F4CB}', title: 'Structured Feedback', desc: 'Every answer gets a clear breakdown: what you did well, what to improve, and the complete ideal answer.', color: 'var(--teal)' },
  { icon: '\u{1F4C8}', title: 'Progressive Difficulty', desc: 'Questions start easy and gradually get harder, exactly like placement rounds. Confidence builds as you improve.', color: 'var(--amber)' },
  { icon: '\u{1F4A1}', title: 'Hint System', desc: 'Stuck? Request a hint. The AI gives a nudge without revealing the full answer, preserving the learning value.', color: 'var(--rose)' },
  { icon: '\u{1F914}', title: 'I Do Not Know Mode', desc: 'Say you do not know and the AI explains the concept simply, provides the ideal answer, then continues.', color: 'var(--accent)' },
  { icon: '\u26A1', title: 'Instant AI Responses', desc: 'Zero waiting. Powered by Claude Sonnet, responses are near-instant so the interview flow stays natural.', color: 'var(--teal)' },
  { icon: '\u{1F504}', title: 'Unlimited Practice', desc: 'Practice as many sessions as you want. Each session generates fresh, relevant questions so repetition never gets stale.', color: 'var(--amber)' },
  { icon: '\u{1F4F1}', title: 'Works Everywhere', desc: 'Fully responsive — practice on your laptop before the interview or on your phone during your commute.', color: 'var(--rose)' },
];

const comparison = [
  { aspect: 'Real-time feedback',    buddy: true,  youtube: false,    mock: 'partial' },
  { aspect: 'Adaptive difficulty',   buddy: true,  youtube: false,    mock: 'partial' },
  { aspect: 'Ideal answer provided', buddy: true,  youtube: true,     mock: false     },
  { aspect: 'Available 24/7',        buddy: true,  youtube: true,     mock: false     },
  { aspect: 'Structured evaluation', buddy: true,  youtube: false,    mock: true      },
  { aspect: 'Hint system',           buddy: true,  youtube: false,    mock: false     },
  { aspect: 'No scheduling needed',  buddy: true,  youtube: true,     mock: false     },
  { aspect: 'Free to use',           buddy: true,  youtube: true,     mock: false     },
];

function Check({ val }) {
  if (val === true)  return <span className="check yes">✓</span>;
  if (val === false) return <span className="check no">✗</span>;
  return <span className="check partial">~</span>;
}

export default function Features() {
  return (
    <div className="features-page">
      <section className="feat-hero">
        <div className="feat-hero-inner">
          <div className="section-label">FEATURES</div>
          <h1 className="feat-title">
            Everything you need to<br/>
            <span className="gradient-text">ace your placements.</span>
          </h1>
          <p className="feat-sub">
            Built from the ground up for engineering students who want structured,
            AI-powered interview practice — not generic chatbots.
          </p>
        </div>
      </section>

      <section className="feat-grid-section">
        <div className="section-inner">
          <div className="feat-grid">
            {features.map((f, i) => (
              <div className="feat-card" key={i} style={{ '--fc': f.color, animationDelay: i * 0.07 + 's' }}>
                <span className="feat-icon">{f.icon}</span>
                <h3 className="feat-card-title">{f.title}</h3>
                <p className="feat-card-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="comparison-section">
        <div className="section-inner">
          <div className="section-label">WHY PLACEMENT BUDDY?</div>
          <h2 className="section-title">How we compare</h2>
          <p className="section-sub">See why students choose Placement Buddy over traditional prep methods.</p>
          <div className="comp-table-wrap">
            <table className="comp-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th className="highlight-col"><div className="th-badge">🎯 Placement Buddy</div></th>
                  <th>YouTube / Notes</th>
                  <th>Mock Interviews</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={i}>
                    <td className="aspect-cell">{row.aspect}</td>
                    <td className="highlight-col"><Check val={row.buddy} /></td>
                    <td><Check val={row.youtube} /></td>
                    <td><Check val={row.mock} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="feat-cta">
        <div className="feat-cta-inner">
          <h2 className="cta-title">Start your first mock interview</h2>
          <p className="feat-cta-sub">Pick a mode and go. No signup, no setup — just practice.</p>
          <Link to="/chat" className="btn-primary large">Try It Now →</Link>
        </div>
      </section>
    </div>
  );
}
