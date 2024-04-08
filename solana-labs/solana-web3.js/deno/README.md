# Solana JavaScript SDK in Deno

This project is a reproducer of an issue with [solana-web3.js](https://github.com/solana-labs/solana-web3.js) library which is not usable in [Deno](https://deno.com) JavaScript runtime.

## Steps to Reproduce

1. Run `deno run -A main.ts`
2. See the output
   ```
   Warning: Not implemented: ClientRequest.options.createConnection
   ws error: Invalid WebSocket frame: invalid UTF-8 sequence
   ```
