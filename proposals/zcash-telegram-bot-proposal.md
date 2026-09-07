# ZCG Grant Proposal: Zcash Telegram Bot — Real-time Info & Education

## Project Overview

| Field | Detail |
|-------|--------|
| **Project Name** | Zcash Telegram Bot |
| **Category** | Zapps / Education |
| **Budget** | $12,000 USD (paid in ZEC) |
| **Timeline** | 3 months |
| **Developer** | Anggy Triatmaja (@gieskuy5) |
| **Repository** | github.com/gieskuy5/zcash-telegram-bot |

---

## Summary

A feature-rich Telegram bot that provides real-time Zcash network information, price tracking, wallet monitoring, and daily educational content about Zcash privacy features. The bot aims to increase Zcash awareness and adoption by making ZEC data easily accessible through the world's most popular messaging platform (900M+ users).

---

## Problem

1. **Information Accessibility** — Zcash users currently need to visit multiple websites (explorers, CoinGecko, forums) to get basic network information
2. **Education Gap** — Many crypto users don't understand Zcash's privacy features (shielded transactions, unified addresses, zk-SNARKs)
3. **Onboarding Friction** — New users find it difficult to monitor their ZEC holdings and understand network activity
4. **No Telegram Presence** — Unlike Bitcoin and Ethereum, Zcash lacks a comprehensive Telegram bot for community engagement

---

## Solution

A free, open-source Telegram bot that serves as a one-stop information hub for Zcash:

### Core Features (Already Built — MVP):
- `/price` — Real-time ZEC price (USD/BTC), 24h change, market cap, volume
- `/network` — Block height, hashrate, difficulty, transactions, mempool
- `/balance <address>` — Check transparent address balance
- `/tip` — Educational tips about Zcash privacy (14+ tips, growing)
- `/report` — Comprehensive daily report combining all data
- `/alert above/below <price>` — Custom price alerts

### Phase 2 Features (Planned):
- Shielded transaction volume tracking
- Mining profitability calculator
- Multi-language support (English, Indonesian, Spanish)
- Group mode (for Zcash community groups)
- Inline queries (quick price check in any chat)
- Weekly ecosystem digest (grants, upgrades, events)
- Integration with Zcash memo field for encrypted messaging demo

### Phase 3 Features (Stretch Goals):
- Wallet creation guide (step-by-step with screenshots)
- ZEC payment request generator
- Network upgrade countdown & notifications
- Zcash quiz/trivia game with educational content
- API endpoint for other developers to use

---

## What's Already Built

**Working MVP deployed on production server:**
- Full Telegram bot with polling-based message handling
- Real-time price data from CoinGecko API
- Network statistics from Blockchair API
- Wallet balance checker for transparent addresses
- 14 educational tips about Zcash privacy features
- Price alert system with above/below triggers
- Auto-restart via systemd service
- Bot live at: @TrackgoatBot

**Tech Stack:**
- Python 3.11
- Telegram Bot API (polling)
- CoinGecko API (price data)
- Blockchair API (blockchain data)
- Ubuntu VPS (DigitalOcean)

---

## Milestones

### Milestone 1 — Core Bot Enhancement (Month 1) — $4,000
- [ ] Add shielded transaction volume tracking
- [ ] Mining profitability calculator
- [ ] Improve error handling & rate limiting
- [ ] Add inline query support
- [ ] Deploy to dedicated VPS with monitoring
- [ ] Open-source repository with documentation
- [ ] Unit tests & CI/CD pipeline

### Milestone 2 — Education & Multi-language (Month 2) — $4,000
- [ ] Expand educational content to 50+ tips
- [ ] Multi-language support (EN, ID, ES)
- [ ] Weekly ecosystem digest (auto-generated)
- [ ] Group mode for community channels
- [ ] Wallet creation guide (interactive)
- [ ] Network upgrade notifications
- [ ] User analytics dashboard

### Milestone 3 — Advanced Features & Community (Month 3) — $4,000
- [ ] ZEC payment request generator
- [ ] Zcash quiz/trivia game
- [ ] API endpoint for developers
- [ ] Community feedback integration
- [ ] Performance optimization
- [ ] Documentation & handoff guide
- [ ] Marketing & community outreach

---

## Budget Breakdown

| Item | Cost |
|------|------|
| Development (3 months) | $9,000 |
| VPS hosting (1 year) | $600 |
| API costs (premium tiers) | $400 |
| Testing & QA | $1,000 |
| Documentation & marketing | $1,000 |
| **Total** | **$12,000** |

---

## Team

**Anggy Triatmaja**
- 5+ years experience in automation & API integration
- Proficient in Python, JavaScript, Playwright, Selenium
- Experience managing 10+ client campaigns simultaneously
- Active in crypto/Web3 community
- GitHub: github.com/gieskuy5

---

## Communication Plan

- Monthly progress updates on Zcash Community Forum
- Open GitHub repository with issue tracking
- Telegram channel for bot announcements
- Available for ZCG committee questions via forum/email

---

## Risk Management

| Risk | Mitigation |
|------|-----------|
| API rate limits | Multiple data sources, caching layer |
| Bot downtime | Systemd auto-restart, health monitoring |
| Telegram policy changes | Webhook fallback, multi-platform readiness |
| Low adoption | Community outreach, Zcash group integrations |

---

## Maintenance

After grant period:
- Bot will continue running on existing VPS (pre-paid 1 year)
- Open-source community can contribute
- Will apply for maintenance grant if needed
- Minimal ongoing cost (~$50/month hosting)

---

## Differentiation

Unlike generic crypto bots:
- **Zcash-specific** — focused entirely on ZEC ecosystem
- **Educational** — teaches privacy concepts, not just price
- **Shielded-aware** — tracks shielded transaction metrics
- **Community-driven** — open-source, multilingual
- **Lightweight** — no wallet custody, no funds handling

---

## Licensing & Compliance

- MIT License (open-source)
- No custody of user funds
- No personal data collection beyond Telegram chat ID
- GDPR compliant (no EU data stored)

---

## References

- Zcash Protocol: https://z.cash
- ZecHub: https://zechub.wiki
- Bot MVP: @TrackgoatBot on Telegram
- Developer: github.com/gieskuy5
