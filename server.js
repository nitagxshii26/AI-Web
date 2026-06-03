# server.js
# -------------------------------------------------------------------
# Express based proxy to forward requests to OpenRouter. It reads the API key from .env and uses CORS so that your front‑end can hit the same origin.
# -------------------------------------------------------------------
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

// Allow cross‑origin requests from the dev‑server (e.g., Vite, Next.js)
app.use(cors());
app.use(express.json());

app.post('/ask-ai', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'prompt required' });
  try {
    const response = await fetch('https://api.openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 500
      })
    });
    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json(error);
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal server error' });
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`AI proxy listening on port ${process.env.PORT ? process.env.PORT : 4000}`);
});