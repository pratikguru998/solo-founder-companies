/* global COMPANIES, METRICS, SECTORS */

const fmt = (b) => {
  if (b >= 1000) return `$${(b / 1000).toFixed(2).replace(/0$/, "")}T`;
  if (b >= 1) return `$${b >= 100 ? Math.round(b) : b.toFixed(1).replace(/\.0$/, "")}B`;
  return `$${Math.round(b * 1000)}M`;
};

const rows = COMPANIES
  .map(([name, founder, year, country, sector, value, metric, asOf, status, note]) =>
    ({ name, founder, year, country, sector, value, metric, asOf, status, note }))
  .sort((a, b) => b.value - a.value);
rows.forEach((r, i) => { r.rank = i + 1; });

// Bars use a log scale so a $3M indie and a $2T giant both stay visible.
const maxLog = Math.log10(rows[0].value * 1000);
const barWidth = (v) => `${Math.max(2, (Math.log10(v * 1000) / maxLog) * 100)}%`;

const STATUSES = ["All", "Public", "Private", "Acquired", "Bootstrapped"];
const state = { view: "sector", q: "", sector: "", country: "", status: "All", sort: "value", selected: rows[0] };

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const uniq = (key) => [...new Set(rows.map((r) => r[key]))].sort();

function filtered() {
  const q = state.q.toLowerCase();
  const out = rows.filter((r) =>
    (!q || `${r.name} ${r.founder} ${r.country} ${r.sector}`.toLowerCase().includes(q)) &&
    (!state.sector || r.sector === state.sector) &&
    (!state.country || r.country === state.country) &&
    (state.status === "All" || r.status === state.status));
  const by = {
    value: (a, b) => b.value - a.value,
    new: (a, b) => b.year - a.year || b.value - a.value,
    old: (a, b) => a.year - b.year || b.value - a.value,
    name: (a, b) => a.name.localeCompare(b.name),
  }[state.sort];
  return out.sort(by);
}

function renderStats() {
  const total = rows.reduce((s, r) => s + r.value, 0);
  const years = rows.map((r) => r.year).sort((a, b) => a - b);
  const stats = [
    ["Companies", rows.length],
    ["Combined size", fmt(total)],
    ["Countries", uniq("country").length],
    ["Median founding year", years[Math.floor(years.length / 2)]],
  ];
  $("stats").innerHTML = stats.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");
}

function renderControls() {
  $("sector").innerHTML = `<option value="">All sectors</option>` +
    SECTORS.map((s) => `<option>${esc(s)}</option>`).join("");
  $("country").innerHTML = `<option value="">All countries</option>` +
    uniq("country").map((s) => `<option>${esc(s)}</option>`).join("");
  $("status").innerHTML = STATUSES.map((s) =>
    `<button role="tab" data-s="${s}">${s === "All" ? "All" : `<span class="dot ${s}"></span>${s}`}</button>`).join("");

  $("search").addEventListener("input", (e) => { state.q = e.target.value; render(); });
  $("sector").addEventListener("change", (e) => { state.sector = e.target.value; render(); });
  $("country").addEventListener("change", (e) => { state.country = e.target.value; render(); });
  $("sort").addEventListener("change", (e) => { state.sort = e.target.value; render(); });
  $("view").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (b) { state.view = b.dataset.v; render(); }
  });
  $("status").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (b) { state.status = b.dataset.s; render(); }
  });
}

const rowHtml = (r) => `
    <li data-rank="${r.rank}" class="${r === state.selected ? "selected" : ""}">
      <span class="rank">${r.rank}</span>
      <div class="who">
        <div class="name">${esc(r.name)}</div>
        <div class="meta"><span class="dot ${r.status}"></span>${esc(r.founder)} · ${esc(r.country)} · ${r.year}</div>
      </div>
      <div class="val">
        <div class="num"><strong>${fmt(r.value)}</strong><small>${METRICS[r.metric]} · ${r.asOf}</small></div>
        <div class="track"><span style="width:${barWidth(r.value)}"></span></div>
      </div>
    </li>`;

function renderList(list) {
  $("count").textContent = list.length === rows.length
    ? `All ${rows.length} companies` : `${list.length} of ${rows.length} companies`;
  if (!list.length) { $("list").innerHTML = `<li class="empty">No companies match these filters.</li>`; return; }
  if (state.view === "rank") { $("list").innerHTML = list.map(rowHtml).join(""); return; }
  $("list").innerHTML = SECTORS.map((sector) => {
    const own = list.filter((r) => r.sector === sector);
    if (!own.length) return "";
    return `<li class="group"><h2>${esc(sector)}</h2><span>${own.length} ${own.length === 1 ? "company" : "companies"}</span></li>` +
      own.map(rowHtml).join("");
  }).join("");
}

function renderDetail() {
  const r = state.selected;
  if (!r) { $("detail").innerHTML = `<p class="empty">Pick a company to see details.</p>`; return; }
  const wiki = `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(r.name.replace(/ \(.*\)$/, ""))}`;
  $("detail").innerHTML = `
    <h2>#${r.rank} ${esc(r.name)}</h2>
    <p class="founder">Founded by ${esc(r.founder)}</p>
    <div class="big">${fmt(r.value)}</div>
    <div class="meta">${METRICS[r.metric]}, ${r.asOf}</div>
    <dl>
      <dt>Founded</dt><dd>${r.year} (${new Date().getFullYear() - r.year} years ago)</dd>
      <dt>Country</dt><dd>${esc(r.country)}</dd>
      <dt>Sector</dt><dd>${esc(r.sector)}</dd>
      <dt>Status</dt><dd><span class="dot ${r.status}"></span>${r.status}</dd>
    </dl>
    ${r.note ? `<p class="note">${esc(r.note)}</p>` : ""}
    <a href="${wiki}" target="_blank" rel="noopener">Read more on Wikipedia ↗</a>`;
}

function renderBars(id, key, list) {
  const counts = countBy(list, key);
  const max = counts.length ? counts[0][1] : 1;
  $(id).innerHTML = counts.slice(0, key === "sector" ? SECTORS.length : 10).map(([k, n]) => `
    <li><button data-k="${esc(k)}" class="${state[key] === k ? "active" : ""}">
      <span class="label">${esc(k)}</span>
      <span class="track"><span style="width:${(n / max) * 100}%"></span></span>
      <span class="n">${n}</span>
    </button></li>`).join("");
  $(id).onclick = (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    state[key] = state[key] === b.dataset.k ? "" : b.dataset.k;
    $(key).value = state[key];
    render();
  };
}

function countBy(list, key) {
  const m = new Map();
  list.forEach((r) => m.set(r[key], (m.get(r[key]) || 0) + 1));
  return [...m].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

function render() {
  const list = filtered();
  if (!list.includes(state.selected)) state.selected = list[0] || null;
  document.querySelectorAll("#view button").forEach((b) => b.classList.toggle("active", b.dataset.v === state.view));
  document.querySelectorAll("#status button").forEach((b) => b.classList.toggle("active", b.dataset.s === state.status));
  renderList(list);
  renderDetail();
  renderBars("by-sector", "sector", list);
  renderBars("by-country", "country", list);
}

$("list").addEventListener("click", (e) => {
  const li = e.target.closest("li[data-rank]");
  if (!li) return;
  state.selected = rows[li.dataset.rank - 1];
  render();
  if (window.matchMedia("(max-width: 900px)").matches) $("panel").scrollIntoView({ behavior: "smooth" });
});

renderStats();
renderControls();
render();
