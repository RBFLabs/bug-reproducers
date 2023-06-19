# Empty Signing Info Addresses

This project is a reproducer of a potential bug in either [cosmjs](https://github.com/cosmos/cosmjs) or directly in [cosmos-sdk](https://github.com/cosmos/cosmos-sdk) which makes it impossible to get signing infos of all bonded validators on Cosmos Hub.
Some signing info records contain an empty address which might point at some serialization issue.

## Steps to Reproduce

1. Get all signing infos via RPC
2. Get all bonded validators via RPC
3. Try to match validators to their signing infos
4. See how many validators do not have any signing infos
5. See that there are some signing infos with empty addresses

You can run a simple script that will go through all these steps:

```
yarn tsx src/index.ts
```
