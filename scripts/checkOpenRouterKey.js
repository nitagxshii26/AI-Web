const fetch = require("node-fetch");

(async () => {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) {
    console.error("Missing OPENROUTER_API_KEY env variable.");
    process.exit(1);
  }

  try {
    const resp = await fetch("https://api.openrouter.ai/api/v1/me", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${key}`,
      },
    });

    if (!resp.ok) {
      const errJson = await resp.json();
      console.error("OpenRouter auth failed:", errJson);
      process.exit(1);
    }

    const data = await resp.json();
    console.log("OpenRouter user verified:", data);
    process.exit(0);
  } catch (e) {
    console.error("Network error:", e.message);
    process.exit(1);
  }
})();