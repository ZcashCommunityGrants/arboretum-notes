# Grant Application: FROST Multi-Signature UI for Zcash Orchard

**Repository:** https://github.com/lamb356/frost-ui

## Project Overview

**Project Name:** FROST Multi-Signature UI for Zcash Orchard  
**Category:** Wallets  
**Budget:** $42,000 USD (paid in shielded ZEC)  
**Timeline:** 12 weeks from approval (Milestone 1 already complete)  
**Developer:** Carson (lamb356)  

### Summary
Production-ready web UI for FROST threshold signatures on Zcash Orchard transactions, fully integrated with the Zcash Foundation’s frostd server. This project delivers what previous attempts could not: a working Zcash Orchard (RedPallas) implementation with 76+ tests proving cryptographic correctness.

### Problem
Zcash users lack a production-ready interface for threshold signatures on Orchard transactions. While the FROST protocol (RFC 9591) and frostd server (v1.0.0) exist, no broadly adopted UI:
- Integrates with frostd’s REST API
- Supports Zcash Orchard (RedPallas curve, ZIP-312 rerandomization)
- Provides end-to-end encryption for signing ceremonies

### Solution
Production web UI for FROST threshold signing featuring:
- Full frostd REST API integration (8 endpoints)
- XEdDSA authentication via Rust WASM
- E2E encryption (X25519 + HKDF + AES-256-GCM)
- Both Ed25519 and Zcash Orchard (RedPallas) support
- Message-driven state machines with production validation

**Key Generation Model:** Trusted dealer key generation; DKG out of scope.

## Completed (Milestone 1 ✅)
- frostd client (8 REST endpoints)
- XEdDSA WASM module
- E2E encryption module
- Ed25519 FROST WASM
- Zcash Orchard WASM (RedPallas, ZIP-312)
- Production state machines with validation
- 76+ automated tests
- CI/CD pipeline (Rust 1.88.0, wasm-pack 0.13.1, Node 20.19.0)

## Milestone Plan

### M2: User Testing & Refinement (5 weeks, $8,000)
- 10 user testing sessions
- UX improvements & error recovery
- Security regression tests

### M3: Documentation & Deployment (3 weeks, $6,000)
- User guide + video tutorials
- Deployment guide + v1.0.0 release

### M4: Ecosystem Integration (4 weeks, $10,000)
- Integration guide + examples
- Partner demos
- NPM package for WASM modules

**Total:** 12 weeks | $42,000 USD

## Team
**Carson (lamb356)** – Solo developer; GitHub: https://github.com/lamb356

## References
- frostd v1.0.0: https://frost.zfnd.org/zcash/server.html
- FROST RFC 9591: https://datatracker.ietf.org/doc/rfc9591/
- ZIP-312: https://zips.z.cash/zip-0312