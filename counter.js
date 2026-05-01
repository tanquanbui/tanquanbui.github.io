// Visitor counter — calls the API Gateway endpoint.
// Replace API_URL with your deployed endpoint (run `make patch-counter`).
const API_URL = "https://YOUR_API_ID.execute-api.YOUR_REGION.amazonaws.com/counter";

async function updateVisitorCount() {
  const el = document.getElementById('visitor-count');
  if (!el) return;

  try {
    const res = await fetch(API_URL, { method: 'POST' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { count } = await res.json();

    // Use the shared countUp from main.js if available, else just set text
    if (typeof window.countUp === 'function') {
      window.countUp(el, count);
    } else {
      el.textContent = count.toLocaleString();
    }
  } catch (err) {
    if (el) el.textContent = '—';
    console.error('Visitor counter unavailable:', err);
  }
}

// Small delay so main.js countUp is guaranteed to be defined
setTimeout(updateVisitorCount, 200);
