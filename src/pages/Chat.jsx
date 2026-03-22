import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { MODES, buildSystemPrompt, START_PROMPT } from '../config/prompts';
import './Chat.css';

/* ── helpers ── */
function formatBubble(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/📋 Feedback/g,    '<span class="fl feedback">📋 Feedback</span>')
    .replace(/✅ Strengths:/g,   '<span class="fl strengths">✅ Strengths</span>')
    .replace(/⚡ Improvements:/g,'<span class="fl improve">⚡ Improvements</span>')
    .replace(/✨ Ideal Answer/g, '<span class="fl ideal">✨ Ideal Answer</span>')
    .replace(/🎯 Next Question/g,'<span class="fl next">🎯 Next Question</span>')
    .replace(/\n{2,}/g, '</p><p class="mp">')
    .replace(/\n/g, '<br/>');
}

const QUICK_ACTIONS = [
  { label: "I don't know", icon: '🤷' },
  { label: 'Give me a hint', icon: '💡' },
  { label: 'Can you clarify?', icon: '❓' },
  { label: 'Skip question', icon: '⏭' },
];

/* ── MODE SELECTOR ── */
function ModeSelector({ onSelect }) {
  return (
    <div className="mode-selector">
      <div className="ms-header">
        <div className="ms-logo">🎯</div>
        <h2>Welcome to <span>Placement Buddy</span></h2>
        <p>Choose an interview mode to begin your practice session.</p>
      </div>
      <div className="ms-grid">
        {Object.values(MODES).map(m => (
          <button
            key={m.key}
            className="ms-card"
            style={{ '--mc': m.color }}
            onClick={() => onSelect(m.key)}
          >
            <span className="ms-icon">{m.icon}</span>
            <div className="ms-info">
              <div className="ms-title">{m.label}</div>
              <div className="ms-desc">{m.desc}</div>
            </div>
            <div className="ms-meta">
              <span className="ms-tag">{m.difficulty}</span>
              <span className="ms-arrow">→</span>
            </div>
          </button>
        ))}
      </div>
      <p className="ms-note">💡 Each session generates a fresh set of questions</p>
    </div>
  );
}

/* ── MAIN CHAT PAGE ── */
export default function Chat() {
  const location = useLocation();
  const [mode, setMode] = useState(null);
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [qaCount, setQaCount] = useState(0);
  const [started, setStarted] = useState(false);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const abortRef = useRef(null);

  /* scroll to bottom */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  /* auto-start if mode passed via nav state */
  useEffect(() => {
    if (location.state?.mode) startInterview(location.state.mode);
  }, []); // eslint-disable-line

  /* textarea auto-resize */
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 160) + 'px';
  }, [input]);

  const callClaude = useCallback(async (msgs, sysPrompt) => {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: sysPrompt,
        messages: msgs,
      }),
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    const data = await res.json();
    return data.content?.map(b => b.text || '').join('') || '';
  }, []);

  const startInterview = async (selectedMode) => {
    setMode(selectedMode);
    setMessages([]);
    setHistory([]);
    setQaCount(0);
    setStarted(true);
    setLoading(true);

    const sysPrompt = buildSystemPrompt(selectedMode);
    try {
      const initMsgs = [{ role: 'user', content: START_PROMPT }];
      const reply = await callClaude(initMsgs, sysPrompt);
      const newHistory = [
        { role: 'user', content: START_PROMPT },
        { role: 'assistant', content: reply },
      ];
      setHistory(newHistory);
      setMessages([{ role: 'assistant', content: reply, id: Date.now() }]);
    } catch (e) {
      setMessages([{ role: 'assistant', content: '⚠️ Could not connect. Please check your setup.', id: Date.now(), error: true }]);
    }
    setLoading(false);
  };

  const sendMessage = async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput('');

    const userMsg = { role: 'user', content: msg, id: Date.now() };
    setMessages(prev => [...prev, userMsg]);

    const newHistory = [...history, { role: 'user', content: msg }];
    setHistory(newHistory);
    setQaCount(c => c + 1);
    setLoading(true);

    const sysPrompt = buildSystemPrompt(mode);
    try {
      const reply = await callClaude(newHistory, sysPrompt);
      const aiMsg = { role: 'assistant', content: reply, id: Date.now() + 1 };
      setMessages(prev => [...prev, aiMsg]);
      setHistory(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ Request failed. Try again.', id: Date.now(), error: true }]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetSession = () => {
    setMode(null);
    setMessages([]);
    setHistory([]);
    setInput('');
    setQaCount(0);
    setStarted(false);
    setLoading(false);
  };

  const modeInfo = mode ? MODES[mode] : null;

  return (
    <div className="chat-page">
      {!started ? (
        <ModeSelector onSelect={startInterview} />
      ) : (
        <div className="chat-layout">
          {/* ── SIDEBAR ── */}
          <aside className="chat-sidebar">
            <div className="sidebar-section">
              <div className="sidebar-label">CURRENT MODE</div>
              {modeInfo && (
                <div className="sidebar-mode" style={{ '--mc': modeInfo.color }}>
                  <span className="sm-icon">{modeInfo.icon}</span>
                  <div>
                    <div className="sm-name">{modeInfo.label}</div>
                    <div className="sm-diff">{modeInfo.difficulty}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="sidebar-section">
              <div className="sidebar-label">SESSION STATS</div>
              <div className="stat-row">
                <span>Questions</span>
                <span className="stat-val">{qaCount}</span>
              </div>
              <div className="stat-row">
                <span>Mode</span>
                <span className="stat-val" style={{ color: modeInfo?.color }}>{mode}</span>
              </div>
            </div>

            <div className="sidebar-section">
              <div className="sidebar-label">TOPICS COVERED</div>
              <div className="topic-chips">
                {modeInfo?.topics.map(t => (
                  <span key={t} className="sidebar-chip">{t}</span>
                ))}
              </div>
            </div>

            <div className="sidebar-section">
              <div className="sidebar-label">TIPS</div>
              <div className="tips">
                <div className="tip">💡 Answer clearly & concisely</div>
                <div className="tip">🧠 Think before typing</div>
                <div className="tip">📝 Use "I don't know" if stuck</div>
                <div className="tip">⏱ Take your time — no rush</div>
              </div>
            </div>

            <button className="btn-new-session" onClick={resetSession}>
              ↩ Change Mode
            </button>
          </aside>

          {/* ── CHAT MAIN ── */}
          <div className="chat-main">
            {/* top bar */}
            <div className="chat-topbar">
              <div className="topbar-left">
                <div className="topbar-avatar">🎯</div>
                <div>
                  <div className="topbar-name">Placement Buddy</div>
                  <div className="topbar-status">
                    <span className="status-dot" />
                    {loading ? 'Thinking...' : 'Online · Ready'}
                  </div>
                </div>
              </div>
              <div className="topbar-right">
                <div className="qa-badge">
                  <span>Q&A</span>
                  <span className="qa-num">{qaCount}</span>
                </div>
                <button className="topbar-reset" onClick={resetSession}>New Session</button>
              </div>
            </div>

            {/* messages */}
            <div className="messages-area">
              {messages.map(msg => (
                <div key={msg.id} className={`msg-row ${msg.role}`}>
                  <div className="msg-avatar">
                    {msg.role === 'assistant' ? '🎯' : '👤'}
                  </div>
                  <div className={`msg-bubble ${msg.error ? 'error' : ''}`}>
                    {msg.role === 'assistant' ? (
                      <p
                        className="mp"
                        dangerouslySetInnerHTML={{ __html: formatBubble(msg.content) }}
                      />
                    ) : (
                      <p className="mp">{msg.content}</p>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="msg-row assistant">
                  <div className="msg-avatar">🎯</div>
                  <div className="msg-bubble typing-bubble">
                    <span className="dot" /><span className="dot" /><span className="dot" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* quick actions */}
            <div className="quick-actions">
              {QUICK_ACTIONS.map(q => (
                <button
                  key={q.label}
                  className="quick-btn"
                  onClick={() => sendMessage(q.label)}
                  disabled={loading}
                >
                  {q.icon} {q.label}
                </button>
              ))}
            </div>

            {/* input */}
            <div className="chat-input-area">
              <div className="input-wrap">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your answer… (Enter to send, Shift+Enter for new line)"
                  rows={1}
                  disabled={loading}
                  className="chat-textarea"
                />
                <button
                  className="send-btn"
                  onClick={() => sendMessage()}
                  disabled={loading || !input.trim()}
                >
                  {loading ? (
                    <span className="send-spinner" />
                  ) : (
                    <span>↑</span>
                  )}
                </button>
              </div>
              <div className="input-hint">Enter ↵ to send · Shift+Enter for new line</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
