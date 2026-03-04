# FROST Multi-Signature UI for Zcash Orchard

A production-ready web UI for FROST threshold signatures on Zcash Orchard transactions, fully integrated with the Zcash Foundation's frostd server (v1.0.0).

## Features

- Full frostd REST API integration (8 endpoints)
- XEdDSA authentication via Rust WASM
- End-to-end encryption (X25519 + AES-256-GCM)
- Ed25519 and Zcash Orchard (RedPallas) support
- Message-driven state machines with validation and deduplication
- Trusted dealer key generation model

## Getting Started

Prerequisites:
- Node.js v20.19.0
- npm
- Rust v1.88.0 and wasm-pack v0.13.1 for WASM modules

Installation:

1. Clone the repository:
   ```bash
   git clone https://github.com/lamb356/frost-ui.git
   cd frost-ui
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run tests:
   ```bash
   npm test      # Runs 9 Zcash WASM tests
   ```
4. (Optional) Run live frostd tests:
   ```bash
   npm run test:ed25519 -- https://localhost:2745  # 33 tests
   npm run test:zcash-live -- https://localhost:2745  # 34 tests
   ```

## License

This project is licensed under the MIT License.
