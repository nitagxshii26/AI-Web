// server.js
// Legacy local proxy – kept for local dev but is *not* used by Vercel.
// Exported only to support `npm start` locally.

const { config } = require('dotenv');
config({ path: './.gitignore/.env' });

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
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
  console.log(`AI proxy listening on port ${process.env.PORT || 4000}`);
});
