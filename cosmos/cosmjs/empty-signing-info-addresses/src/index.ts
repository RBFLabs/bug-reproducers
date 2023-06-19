import { fromBech32 } from "@cosmjs/encoding";
import {
  QueryClient,
  setupSlashingExtension,
  setupStakingExtension,
} from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import type { ValidatorSigningInfo } from "cosmjs-types/cosmos/slashing/v1beta1/slashing";
import { consensusPubKeyToBech32Address } from "./consensusPubKeyToBech32Address";
import { fetchAllPages } from "./fetchAllPages";

const rpcUrl = "https://cosmos-rpc.rockrpc.net";

(async () => {
  const client = await Tendermint34Client.connect(rpcUrl);
  const queryClient = QueryClient.withExtensions(
    client,
    setupSlashingExtension,
    setupStakingExtension
  );

  console.log("Fetching all signing infos...");
  const signingInfos = await fetchAllPages(async (paginationKey) => {
    const { pagination, info } = await queryClient.slashing.signingInfos(
      paginationKey
    );
    return { pagination, records: info };
  });

  console.log(`Found ${signingInfos.length} signing infos:`);
  console.log(signingInfos);

  const signingInfosMap = new Map<string, ValidatorSigningInfo>(
    signingInfos.map((info) => [info.address, info])
  );

  const signingInfosWithoutAddresses = signingInfos.filter(
    ({ address }) => !address
  );

  console.log("Fetching all bonded validators...");
  const validators = await fetchAllPages(async (paginationKey) => {
    const { pagination, validators } = await queryClient.staking.validators(
      "BOND_STATUS_BONDED",
      paginationKey
    );
    return { pagination, records: validators };
  });

  const missingSigningInfoAddreses = validators.reduce(
    (consensusAddresses, { consensusPubkey, operatorAddress }) => {
      const { prefix } = fromBech32(operatorAddress);

      if (consensusPubkey) {
        const consensusAddress = consensusPubKeyToBech32Address(
          consensusPubkey,
          prefix.replace("valoper", "")
        );

        if (!signingInfosMap.has(consensusAddress)) {
          consensusAddresses.push(consensusAddress);
        }
      } else {
        console.warn(`Validator ${operatorAddress} has no consensus pubkey`);
      }

      return consensusAddresses;
    },
    new Array<string>()
  );

  console.log("Missing signing info addresses:");
  console.log(missingSigningInfoAddreses);

  console.log(
    `${missingSigningInfoAddreses.length}/${validators.length} bonded validators have no signing info`
  );
  console.log(
    `${signingInfosWithoutAddresses.length}/${signingInfos.length} signing infos have empty addresses`
  );
})();
