import React, { useState } from 'react';
import './AskAISection.css';

const AskAISection: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: question })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(`Error ${res.status}: ${data.error?.message || 'unknown'}`);
      } else {
        const txt = data.choices?.[0]?.message?.content || '(No answer)';
        setAnswer(txt);
      }
    } catch (err) {
      setError(`Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ask-ai" className="ask-ai-hero">
      <h2 className="title">Ask AI Anything</h2>
      <form id="ask-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="question"
          placeholder="Ask something…"
          required
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Thinking…' : 'Ask'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      <pre id="answer" className="answer">{answer}</pre>
    </section>
  );
};

export default AskAISection;
