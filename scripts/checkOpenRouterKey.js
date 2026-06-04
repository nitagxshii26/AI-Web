#!/usr/bin/env node

// A lightweight script to validate the OPENROUTER_API_KEY environment variable.
// The script is deliberately minimal so it can be executed in a Vercel deployment
// without any local configuration.  It prints a success message and exits with
// a zero status code when the key is valid, otherwise it exits with a non‑zero
// error code.

const key = process.env.OPENROUTER_API_KEY;
if (!key) {
  console.error('❌  OPENROUTER_API_KEY is not set in the environment.');
  process.exit(1);
}

// Prefer the native `fetch` that Node 18+ ships with, falling back to
// `node-fetch` for older runtimes.
const fetchFn = globalThis.fetch || require('node-fetch');

(async () => {
  try {
    const resp = await fetchFn('https://api.openrouter.ai/api/v1/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${key}`
      }
    });

    if (!resp.ok) {
      const err = await resp.json();
      console.error(`❌  Authentication failed: ${resp.status} ${resp.statusText}`);
      console.error(JSON.stringify(err, null, 2));
      process.exit(1);
    }

    const data = await resp.json();
    console.log('✅  OpenRouter key verified!');
    console.log(JSON.stringify(data, null, 2));
    process.exit(0);
  } catch (e) {
    console.error('❌  Network error:', e.message);
    process.exit(1);
  }
})();