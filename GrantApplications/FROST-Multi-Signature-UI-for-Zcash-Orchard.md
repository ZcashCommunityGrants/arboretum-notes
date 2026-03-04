# Grant Application: FROST Multi-Signature UI for Zcash Orchard

## Project Overview

**Project Name:** FROST Multi-Signature UI for Zcash Orchard
**Category:** Wallets
**Budget:** $42,000 USD (paid in shielded ZEC)
**Timeline:** 12 weeks from approval (Milestone 1 already complete)
**Developer:** Carson (lamb356)
**Repository:** https://github.com/lamb356/frost-ui

## Summary

Production-ready web UI for FROST threshold signatures on Zcash Orchard transactions, fully integrated with the Zcash Foundation's frostd server. This project delivers what previous attempts could not: a working Zcash Orchard (RedPallas) implementation with 76+ tests proving cryptographic correctness.

## Problem

Zcash users lack a production-ready interface for threshold signatures on Orchard transactions. While the FROST protocol (RFC 9591) and frostd server (v1.0.0) exist, no broadly adopted UI that:
- Integrates with frostd's REST API
- Supports Zcash Orchard (RedPallas curve, ZIP-312 rerandomization)
- Provides end-to-end encryption for signing ceremonies

## Solution

Production web UI for FROST threshold signing featuring:
- Full frostd REST API integration (8 endpoints)
- XEdDSA authentication via Rust WASM
- E2E encryption (X25519 + HKDF + AES-256-GCM)
- Both Ed25519 and Zcash Orchard (RedPallas) support
- Message-driven state machines with production validation

**Key Generation Model:** Trusted dealer; DKG is out of scope.

*Milestone 1 (Complete) delivered frostd client, XEdDSA WASM, E2E encryption, Ed25519 & Orchard WASM, state machines, 76+ tests, CI/CD.*
