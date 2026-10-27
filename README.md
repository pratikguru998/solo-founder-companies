# Solo Founders 100

**Live:** https://pratikguru998.github.io/solo-founder-companies/

The 100 largest companies started by a single founder — from Amazon and TSMC to one-person indie businesses —
ranked by market cap, last private valuation, acquisition price, or revenue.

Search, filter by sector, country and status (public, private, acquired, bootstrapped), and click any company for
details. Bars use a log scale so a $3M indie and a $2T giant both stay visible.

## Data

`data.js` holds one row per company:
`[name, founder, year founded, country, sector, value (USD bn), metric, as of, status, note]`.

- **Solo founder** means the company was started by one person, as widely reported. Where a partner, investor or
  family member was involved early on, the `note` says so.
- **Value** is the best available headline figure, with its measure (`m` market cap, `v` valuation,
  `a` acquired for, `r` revenue) and year. These measure different things, so the ranking is for orientation only.
- Figures are approximate and rounded, compiled from company reports, press coverage and public market data.
  Not investment advice. Corrections welcome — edit the row in `data.js`.

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.
