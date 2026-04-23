// Visitor counter — calls the API Gateway endpoint created in a later step.
// Replace API_URL with your deployed API Gateway invoke URL.
const API_URL = "https://YOUR_API_ID.execute-api.YOUR_REGION.amazonaws.com/prod/counter";

async function updateVisitorCount() {
  const el = document.getElementById("visitor-count");
  try {
    const res = await fetch(API_URL, { method: "POST" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    el.textContent = data.count;
  } catch (err) {
    el.textContent = "—";
    console.error("Counter unavailable:", err);
  }
}

updateVisitorCount();
