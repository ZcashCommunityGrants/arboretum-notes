# ZCG Grant Proposal: Exchange Shielded Withdrawal SDK

**Title:** Open-Source Exchange Shielded Withdrawal SDK for Zcash

**Repository:** https://github.com/lamb356/exchange-shielded-sdk
**Status:** v1.0.0 complete, production-ready
**Tests:** 583 passing across 14 test suites (90%+ coverage)

## Summary
This proposal requests retroactive funding of $38,000 USD for a completed SDK that simplifies shielded Zcash withdrawals for exchanges. The library provides address validation, shielded transaction building with ZIP 317 fee support, audit logging, rate limiting, and pluggable storage adapters. It abstracts complex zero-knowledge proof workflows and has full test coverage.

## Key Components
- AddressValidator (Base58Check/Bech32/Bech32m)
- ShieldedTransactionBuilder (ZIP 317 fees)
- ZcashRpcClient (zcashd/zebrad)
- SecureKeyManager (AES-256-GCM + scrypt)
- WithdrawalRateLimiter & ComplianceManager
- AuditLogger, Storage Adapters, ExchangeShieldedSDK API

## Impact
Enables major exchanges to offer privacy-preserving Zcash withdrawals with minimal integration effort, growing the shielded pool and demonstrating privacy compliance in regulated environments.

_For full details, see the original issue in the arboretum-notes repo._