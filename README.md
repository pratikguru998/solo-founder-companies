# Solo-Founder Software

**Live:** https://pratikguru998.github.io/solo-founder-companies/

100 software and internet companies started by a single founder — from Amazon and ServiceNow to one-person
indie businesses — grouped by the sector they serve: commerce, fintech, enterprise software, HR, security,
developer tools, AI, media and games, travel, healthcare, education, real estate, and marketing.

View them by sector or as one ranked list, search, filter by sector, country and status (public, private, acquired,
bootstrapped), and click any company for details. Bars use a log scale so a $3M indie and a $2T giant both stay visible.

## Data

`data.js` holds one row per company:
`[name, founder, year founded, country, sector, value (USD bn), metric, as of, status, note]`.

- **Software-powered** means the product is software or runs on it: apps, platforms, marketplaces and online
  services. **Solo founder** means the company was started by one person, as widely reported. Where a partner, investor or
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
