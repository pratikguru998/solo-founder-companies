// Software- and internet-powered companies started by a single founder, grouped by the sector they serve,
// with a headline size figure in USD billions.
// [name, founder, year founded, country, sector, value (USD bn), metric, as of, status, note]
// metric: m = market cap, v = last private valuation, a = acquired for, r = annual revenue
// status: Public | Private | Acquired | Bootstrapped
// Figures are approximate and rounded; see README for sources and caveats.

const METRICS = { m: "Market cap", v: "Valuation", a: "Acquired for", r: "Revenue" };

const SECTORS = [
  "Commerce & Marketplaces", "Fintech", "Enterprise Software", "HR & Jobs", "Security", "Developer & Cloud",
  "AI", "Media, Social & Games", "Travel & Mobility", "Healthcare", "Education", "Real Estate & Construction",
  "Marketing & Web",
];

const COMPANIES = [
  // Commerce & Marketplaces
  ["Amazon", "Jeff Bezos", 1994, "United States", "Commerce & Marketplaces", 2300, "m", 2025, "Public"],
  ["PDD Holdings (Pinduoduo, Temu)", "Colin Huang", 2015, "China", "Commerce & Marketplaces", 160, "m", 2025, "Public"],
  ["JD.com", "Richard Liu", 1998, "China", "Commerce & Marketplaces", 50, "m", 2025, "Public", "Started as a shop in Beijing and moved online in 2004."],
  ["eBay", "Pierre Omidyar", 1995, "United States", "Commerce & Marketplaces", 40, "m", 2025, "Public"],
  ["Trendyol", "Demet Mutlu", 2010, "Turkey", "Commerce & Marketplaces", 16.5, "v", 2021, "Private", "Majority-owned by Alibaba."],
  ["Rakuten", "Hiroshi Mikitani", 1997, "Japan", "Commerce & Marketplaces", 13, "m", 2025, "Public"],
  ["ZOZO", "Yusaku Maezawa", 1998, "Japan", "Commerce & Marketplaces", 9, "m", 2025, "Public", "Controlled by LY Corp (Yahoo Japan) since 2019."],
  ["Nykaa", "Falguni Nayar", 2012, "India", "Commerce & Marketplaces", 7, "m", 2025, "Public"],
  ["Lightspeed Commerce", "Dax Dasilva", 2005, "Canada", "Commerce & Marketplaces", 1.8, "m", 2025, "Public"],
  ["Depop", "Simon Beckerman", 2011, "United Kingdom", "Commerce & Marketplaces", 1.6, "a", 2021, "Acquired", "Bought by Etsy."],
  ["Justdial", "V.S.S. Mani", 1996, "India", "Commerce & Marketplaces", 1, "m", 2025, "Public"],
  ["Craigslist", "Craig Newmark", 1995, "United States", "Commerce & Marketplaces", 0.66, "r", 2023, "Bootstrapped", "Revenue is an outside estimate (AIM Group)."],
  ["Shipt", "Bill Smith", 2014, "United States", "Commerce & Marketplaces", 0.55, "a", 2017, "Acquired", "Bought by Target."],
  ["Farfetch", "José Neves", 2007, "United Kingdom", "Commerce & Marketplaces", 0.5, "a", 2023, "Acquired", "Peaked near $23B in 2021; rescued by Coupang."],

  // Fintech
  ["Interactive Brokers", "Thomas Peterffy", 1978, "United States", "Fintech", 100, "m", 2025, "Public", "Pioneered fully electronic trading."],
  ["Citadel Securities", "Ken Griffin", 2002, "United States", "Fintech", 22, "v", 2022, "Private", "Algorithmic market maker."],
  ["SS&C Technologies", "Bill Stone", 1986, "United States", "Fintech", 20, "m", 2025, "Public"],
  ["Paytm (One97)", "Vijay Shekhar Sharma", 2000, "India", "Fintech", 7, "m", 2025, "Public"],
  ["Nuvei", "Philip Fayer", 2003, "Canada", "Fintech", 6.3, "a", 2024, "Acquired", "Taken private by Advent International."],
  ["Bill.com", "René Lacerte", 2006, "United States", "Fintech", 5, "m", 2025, "Public"],
  ["Q2 Holdings", "Hank Seale", 2004, "United States", "Fintech", 5, "m", 2025, "Public"],
  ["Envestnet", "Judson Bergman", 1999, "United States", "Fintech", 4.5, "a", 2024, "Acquired", "Taken private by Bain Capital."],
  ["CRED", "Kunal Shah", 2018, "India", "Fintech", 3.5, "v", 2024, "Private"],
  ["Starling Bank", "Anne Boden", 2014, "United Kingdom", "Fintech", 3, "v", 2022, "Private"],
  ["Angel One", "Dinesh Thakkar", 1987, "India", "Fintech", 3, "m", 2025, "Public"],
  ["Payoneer", "Yuval Tal", 2005, "United States", "Fintech", 2.5, "m", 2025, "Public"],
  ["Marqeta", "Jason Gardner", 2010, "United States", "Fintech", 2, "m", 2025, "Public"],
  ["freee", "Daisuke Sasaki", 2012, "Japan", "Fintech", 1.5, "m", 2025, "Public", "Cloud accounting for small businesses."],
  ["Mint", "Aaron Patzer", 2006, "United States", "Fintech", 0.17, "a", 2009, "Acquired", "Bought by Intuit."],

  // Enterprise Software
  ["ServiceNow", "Fred Luddy", 2004, "United States", "Enterprise Software", 190, "m", 2025, "Public"],
  ["Constellation Software", "Mark Leonard", 1995, "Canada", "Enterprise Software", 65, "m", 2025, "Public", "Buys and keeps hundreds of small vertical-software firms."],
  ["Ansys", "John Swanson", 1970, "United States", "Enterprise Software", 35, "a", 2025, "Acquired", "Bought by Synopsys."],
  ["Zoom", "Eric Yuan", 2011, "United States", "Enterprise Software", 25, "m", 2025, "Public"],
  ["PTC", "Samuel Geisberg", 1985, "United States", "Enterprise Software", 22, "m", 2025, "Public"],
  ["Citrix", "Ed Iacobucci", 1989, "United States", "Enterprise Software", 16.5, "a", 2022, "Acquired", "Taken private by Vista and Elliott."],
  ["NetSuite", "Evan Goldberg", 1998, "United States", "Enterprise Software", 9.3, "a", 2016, "Acquired", "Funded by Larry Ellison; later bought by Oracle."],
  ["Kingdee", "Xu Shaochun", 1993, "China", "Enterprise Software", 7, "m", 2025, "Public"],
  ["Calendly", "Tope Awotona", 2013, "United States", "Enterprise Software", 3, "v", 2021, "Private", "Bootstrapped with his savings before raising."],
  ["SafetyCulture", "Luke Anear", 2004, "Australia", "Enterprise Software", 2.5, "v", 2024, "Private"],
  ["Wrike", "Andrew Filev", 2006, "United States", "Enterprise Software", 2.25, "a", 2021, "Acquired", "Bought by Citrix."],

  // HR & Jobs
  ["Recruit Holdings", "Hiromasa Ezoe", 1960, "Japan", "HR & Jobs", 90, "m", 2025, "Public", "Owns Indeed and Glassdoor."],
  ["Paycom", "Chad Richison", 1998, "United States", "HR & Jobs", 12, "m", 2025, "Public"],
  ["Ultimate Software", "Scott Scherr", 1990, "United States", "HR & Jobs", 11, "a", 2019, "Acquired", "Taken private by Hellman & Friedman; now part of UKG."],
  ["Info Edge (Naukri)", "Sanjeev Bikhchandani", 1995, "India", "HR & Jobs", 11, "m", 2025, "Public", "Hitesh Oberoi joined in 2000 and is often called co-founder."],
  ["Paylocity", "Steve Sarowitz", 1997, "United States", "HR & Jobs", 9, "m", 2025, "Public"],
  ["SuccessFactors", "Lars Dalgaard", 2001, "United States", "HR & Jobs", 3.4, "a", 2012, "Acquired", "Bought by SAP."],

  // Security
  ["Palo Alto Networks", "Nir Zuk", 2005, "United States", "Security", 130, "m", 2025, "Public"],
  ["McAfee", "John McAfee", 1987, "United States", "Security", 14, "a", 2022, "Acquired", "Taken private by an Advent-led group."],
  ["Proofpoint", "Eric Hahn", 2002, "United States", "Security", 12.3, "a", 2021, "Acquired", "Taken private by Thoma Bravo."],
  ["Qihoo 360", "Zhou Hongyi", 2005, "China", "Security", 10, "m", 2025, "Public"],
  ["Datto", "Austin McChord", 2007, "United States", "Security", 6.2, "a", 2022, "Acquired", "Bought by Kaseya. Started in his father's basement."],
  ["KnowBe4", "Stu Sjouwerman", 2010, "United States", "Security", 4.6, "a", 2023, "Acquired", "Taken private by Vista."],

  // Developer & Cloud
  ["New Relic", "Lew Cirne", 2008, "United States", "Developer & Cloud", 6.5, "a", 2023, "Acquired", "Taken private by Francisco Partners and TPG."],
  ["AppDynamics", "Jyoti Bansal", 2008, "United States", "Developer & Cloud", 3.7, "a", 2017, "Acquired", "Bought by Cisco days before its IPO."],
  ["Harness", "Jyoti Bansal", 2017, "United States", "Developer & Cloud", 3.7, "v", 2022, "Private"],
  ["Linode", "Christopher Aker", 2003, "United States", "Developer & Cloud", 0.9, "a", 2022, "Acquired", "Bought by Akamai."],

  // AI
  ["C3.ai", "Tom Siebel", 2009, "United States", "AI", 2.5, "m", 2025, "Public"],
  ["DeepL", "Jarek Kutylowski", 2017, "Germany", "AI", 2, "v", 2024, "Private"],
  ["Krutrim", "Bhavish Aggarwal", 2023, "India", "AI", 1, "v", 2024, "Private"],
  ["Stability AI", "Emad Mostaque", 2019, "United Kingdom", "AI", 1, "v", 2022, "Private"],
  ["Midjourney", "David Holz", 2021, "United States", "AI", 0.3, "r", 2024, "Bootstrapped", "Revenue is a press estimate; never raised venture money."],
  ["Base44", "Maor Shlomo", 2025, "Israel", "AI", 0.08, "a", 2025, "Acquired", "Built solo and sold to Wix six months after launch."],
  ["Photo AI & Nomad List", "Pieter Levels", 2014, "Netherlands", "AI", 0.003, "r", 2024, "Bootstrapped", "Combined run-rate he reports publicly; one person, no employees."],

  // Media, Social & Games
  ["NetEase", "William Ding", 1997, "China", "Media, Social & Games", 80, "m", 2025, "Public"],
  ["Electronic Arts", "Trip Hawkins", 1982, "United States", "Media, Social & Games", 55, "a", 2025, "Acquired", "Take-private by a PIF, Silver Lake and Affinity group agreed in 2025."],
  ["Take-Two Interactive", "Ryan Brant", 1993, "United States", "Media, Social & Games", 40, "m", 2025, "Public"],
  ["Epic Games", "Tim Sweeney", 1991, "United States", "Media, Social & Games", 31.5, "v", 2022, "Private"],
  ["Naver", "Lee Hae-jin", 1999, "South Korea", "Media, Social & Games", 25, "m", 2025, "Public"],
  ["Kakao", "Kim Beom-su", 2010, "South Korea", "Media, Social & Games", 20, "m", 2025, "Public"],
  ["Roku", "Anthony Wood", 2002, "United States", "Media, Social & Games", 13, "m", 2025, "Public"],
  ["Bilibili", "Xu Yi", 2009, "China", "Media, Social & Games", 9, "m", 2025, "Public"],
  ["Niantic", "John Hanke", 2010, "United States", "Media, Social & Games", 9, "v", 2021, "Private", "Spun out of Google; its games went to Scopely in 2025."],
  ["Minecraft (Mojang)", "Markus \"Notch\" Persson", 2009, "Sweden", "Media, Social & Games", 2.5, "a", 2014, "Acquired", "Persson built Minecraft alone; Mojang was later formed with Jakob Porsér. Bought by Microsoft."],
  ["Rumble", "Chris Pavlovski", 2013, "Canada", "Media, Social & Games", 2, "m", 2025, "Public"],
  ["Tumblr", "David Karp", 2007, "United States", "Media, Social & Games", 1.1, "a", 2013, "Acquired", "Bought by Yahoo."],
  ["Shutterstock", "Jon Oringer", 2003, "United States", "Media, Social & Games", 0.8, "m", 2025, "Public", "Started by uploading 30,000 of his own photos."],
  ["Bumble", "Whitney Wolfe Herd", 2014, "United States", "Media, Social & Games", 0.7, "m", 2025, "Public", "Launched with backing from Badoo's Andrey Andreev."],
  ["Medium", "Ev Williams", 2012, "United States", "Media, Social & Games", 0.6, "v", 2016, "Private"],
  ["Plenty of Fish", "Markus Frind", 2003, "Canada", "Media, Social & Games", 0.575, "a", 2015, "Acquired", "Run by Frind alone for years; bought by Match Group."],

  // Travel & Mobility
  ["Booking Holdings (Priceline)", "Jay Walker", 1997, "United States", "Travel & Mobility", 170, "m", 2025, "Public", "Started as Priceline.com; Booking.com was bought in 2005."],
  ["Didi", "Cheng Wei", 2012, "China", "Travel & Mobility", 25, "m", 2025, "Public", "Trades over the counter after leaving the NYSE."],
  ["Bolt", "Markus Villig", 2013, "Estonia", "Travel & Mobility", 8.4, "v", 2022, "Private", "Started at 19 with €5,000 from his family."],
  ["CarGurus", "Langley Steinert", 2006, "United States", "Travel & Mobility", 3.5, "m", 2025, "Public"],
  ["OYO", "Ritesh Agarwal", 2013, "India", "Travel & Mobility", 2.4, "v", 2024, "Private"],

  // Healthcare
  ["Epic Systems", "Judith Faulkner", 1979, "United States", "Healthcare", 5.7, "r", 2024, "Bootstrapped", "Electronic health records; never took venture money."],
  ["Lyra Health", "David Ebersman", 2015, "United States", "Healthcare", 5.6, "v", 2022, "Private"],
  ["Babylon Health", "Ali Parsa", 2013, "United Kingdom", "Healthcare", 4.2, "v", 2021, "Private", "Collapsed in 2023."],
  ["WebMD", "Jeff Arnold", 1998, "United States", "Healthcare", 2.8, "a", 2017, "Acquired", "Bought by KKR's Internet Brands."],
  ["Modern Health", "Alyson Watson", 2017, "United States", "Healthcare", 1.17, "v", 2021, "Private"],

  // Education
  ["Course Hero", "Andrew Grauer", 2006, "United States", "Education", 3.6, "v", 2021, "Private"],
  ["Quizlet", "Andrew Sutherland", 2005, "United States", "Education", 1, "v", 2020, "Private", "Built at 15 to study for a French test."],
  ["Teachable", "Ankur Nagpal", 2014, "United States", "Education", 0.25, "a", 2020, "Acquired", "Bought by Hotmart."],

  // Real Estate & Construction
  ["CoStar Group", "Andrew Florance", 1987, "United States", "Real Estate & Construction", 30, "m", 2025, "Public"],
  ["Procore", "Tooey Courtemanche", 2002, "United States", "Real Estate & Construction", 11, "m", 2025, "Public"],

  // Marketing & Web
  ["Automattic (WordPress.com)", "Matt Mullenweg", 2005, "United States", "Marketing & Web", 7.5, "v", 2021, "Private", "WordPress itself was co-created with Mike Little; Automattic was Mullenweg's alone."],
  ["Squarespace", "Anthony Casalena", 2003, "United States", "Marketing & Web", 7.2, "a", 2024, "Acquired", "Taken private by Permira. Started in his college dorm."],
  ["Sprinklr", "Ragy Thomas", 2009, "United States", "Marketing & Web", 2, "m", 2025, "Public"],
  ["Hootsuite", "Ryan Holmes", 2008, "Canada", "Marketing & Web", 1, "v", 2014, "Private"],
  ["Ahrefs", "Dmitry Gerasimenko", 2010, "Singapore", "Marketing & Web", 0.1, "r", 2022, "Bootstrapped", "Revenue is an estimate."],
  ["Kit (ConvertKit)", "Nathan Barry", 2013, "United States", "Marketing & Web", 0.04, "r", 2024, "Bootstrapped", "Annual recurring revenue."],
];
