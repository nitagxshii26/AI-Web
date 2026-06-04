// api/ask-ai.js
// Vercel serverless function to proxy OpenRouter chat completions.
// The function reads the OPENROUTER_API_KEY from Vercel's env vars
// so the key never lands in the browser.

const fetch = require('node-fetch');
const { OPENROUTER_API_KEY } = process.env;

module.exports = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'prompt required' });
  }

  try {
    const response = await fetch('https://api.openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`
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
};