import type { PageResponse } from "cosmjs-types/cosmos/base/query/v1beta1/pagination";

interface FetchPageResponse<T> {
  pagination?: PageResponse;
  records: T[];
}

export async function fetchAllPages<T>(
  fetchPage: (paginationKey?: Uint8Array) => Promise<FetchPageResponse<T>>
): Promise<T[]> {
  const allRecords = [];

  let nextKey: Uint8Array | undefined = undefined;
  while (!nextKey || nextKey.length > 0) {
    const { pagination, records }: FetchPageResponse<T> = await fetchPage(
      nextKey
    );
    allRecords.push(...records);

    nextKey = pagination?.nextKey ?? new Uint8Array();
  }

  return allRecords;
}
