import { Address } from "@ton/core";

export enum NftRevealMode {
  ReadyToReveal = 1,
  Pending = 2,
  Opened = 3,
}

type AccountState = {
  address: string;
  parsed_nft_content_offchain_url: string;
  address__friendly: string;
  parsed_nft_reveal_mode: NftRevealMode;
};

type NftItem = {
  address: string;
  parsed_nft_content_offchain_url: string;
  address__friendly: string;
  parsed_nft_reveal_mode: NftRevealMode;
  thumbnail?: string;
  name?: string;
  image?: string;
  error?: string;
};

export type { AccountState, NftItem };
