import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} from "npm:@solana/web3.js";

(async () => {
  const connection = new Connection(clusterApiUrl("devnet"));

  const keypair = Keypair.generate();
  console.log(keypair.publicKey.toBase58());

  console.log("Requesting airdrop...");
  const airdropSignature = await connection.requestAirdrop(
    keypair.publicKey,
    LAMPORTS_PER_SOL
  );

  console.log("Getting latest block hash...");
  let { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash(
    "confirmed"
  );

  console.log("Confirming airdrop transaction...");
  const result = await connection.confirmTransaction({
    signature: airdropSignature,
    blockhash,
    lastValidBlockHeight,
  });
  console.debug(result);
})();
