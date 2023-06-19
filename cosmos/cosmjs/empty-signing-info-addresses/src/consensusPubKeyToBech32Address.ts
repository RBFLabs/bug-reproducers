import { rawEd25519PubkeyToRawAddress } from "@cosmjs/amino/build/addresses";
import { toBech32 } from "@cosmjs/encoding";
import { Any } from "cosmjs-types/google/protobuf/any";

export function consensusPubKeyToBech32Address(
  { typeUrl, value }: Any,
  zonePrefix: string
) {
  // TODO handle other key types
  if (typeUrl.toLowerCase().includes("ed25519")) {
    return toBech32(
      `${zonePrefix}valcons`,
      rawEd25519PubkeyToRawAddress(value.slice(2))
    );
  } else {
    throw Error(`Unknown key type: ${typeUrl}`);
  }
}
