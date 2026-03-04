## Project Overview

**Project Name:** FROST Multi-Signature UI for Zcash Orchard
**Category:** Wallets
**Budget:** $42,000 USD (paid in shielded ZEC)
**Timeline:** 12 weeks from approval (Milestone 1 already complete)
**Developer:** Carson (lamb356)
**Repository:** https://github.com/lamb356/frost-ui

---

## Summary

Production-ready web UI for FROST threshold signatures on Zcash Orchard transactions, fully integrated with the Zcash Foundation's frostd server. This project delivers what previous attempts could not: a working Zcash Orchard (RedPallas) implementation with 76+ tests proving cryptographic correctness.

---

## Problem

Zcash users lack a production-ready interface for threshold signatures on Orchard transactions. While the FROST protocol (RFC 9591) and frostd server (v1.0.0) exist, no broadly adopted UI:
- Integrates with frostd's REST API
- Supports Zcash Orchard (RedPallas curve, ZIP-312 rerandomization)
- Provides end-to-end encryption for signing ceremonies

**Target Users:**
- DAOs managing Zcash treasuries (3-of-5 approval)
- Families with shared wallets (2-of-3 inheritance)
- Businesses requiring multi-signature transactions
- Privacy-conscious users wanting distributed key custody

---

## Solution

Production web UI for FROST threshold signing featuring:
- Full frostd REST API integration (8 endpoints)
- XEdDSA authentication via Rust WASM
- E2E encryption (X25519 + HKDF + AES-256-GCM)
- Both Ed25519 and Zcash Orchard (RedPallas) support
- Message-driven state machines with production validation

**Key Generation Model:** Trusted-dealer key generation (coordinator distributes shares). DKG is out of scope.

---

## Milestones & Budget

| Milestone | Duration | Payment | Status |
|-----------|----------|---------|--------|
| M1: Core Implementation | —— | $18,000 | ✅ Complete |
| M2: User Testing & Refinement | 5 wks | $8,000 | Pending |
| M3: Documentation & Deployment | 3 wks | $6,000 | Pending |
| M4: Ecosystem Integration | 4 wks | $10,000 | Pending |
| **Total** | **12 wks** | **$42,000** | |

Full details (threat model, maintenance, differentiation, etc.) are recorded in the originating GitHub issue: https://github.com/ZcashCommunityGrants/arboretum-notes/issues/12

---

*Submitted 2024-XX-XX to Zcash Community Grants.*