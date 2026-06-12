// ============================================
// WAVEADS PERKS — CONFIGURATION
// ============================================
// Paste your Google Apps Script Web App URL below.
// See README.md for setup instructions.

const API_URL = "https://script.google.com/macros/s/AKfycbyxaO0Dpp-bHXzmvioFXKMtRyXIZJsB23HVxvZmw0ngzqXXY5lySqGBfHR2M_N7AlAs/exec";

// Current week key, e.g. "2026-W24"
function getCurrentWeek() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = (now - start) / 86400000;
  const week = Math.ceil((diff + start.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${String(week).padStart(2, '0')}`;
}

// End-of-week date label for a given week key
function weekEndLabel(weekKey) {
  const m = weekKey.match(/(\d+)-W(\d+)/);
  if (!m) return '';
  const year = parseInt(m[1], 10);
  const week = parseInt(m[2], 10);
  const jan1 = new Date(year, 0, 1);
  const days = (week - 1) * 7 - jan1.getDay() + 7;
  const sunday = new Date(year, 0, 1 + days);
  return sunday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Generic API call wrapper. Returns { ok, demo, ...data }
async function apiCall(action, payload = {}) {
  if (API_URL === "PASTE_YOUR_APPS_SCRIPT_URL_HERE") {
    return { ok: false, demo: true };
  }
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action, ...payload })
    });
    return await res.json();
  } catch (err) {
    console.error("API error:", err);
    return { ok: false, error: err.message };
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str == null ? '' : String(str);
  return div.innerHTML;
}

const LOGO_SVG = `<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" stroke="#5BC4B5" stroke-width="9" stroke-linecap="round">
    <path d="M5 12 Q15 4 25 12 T45 12 T65 12"/>
    <path d="M5 30 Q15 22 25 30 T45 30 T65 30"/>
    <path d="M5 48 Q15 40 25 48 T45 48 T65 48"/>
  </g>
</svg>`;
