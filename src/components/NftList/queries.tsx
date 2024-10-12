import { AccountState, Address } from "@ton/core";
import { gql } from "graphql-request";

const endpoint = "https://dton.io/graphql/";

const RawAccountStatesQuery = (
  collection_address: string,
  owner_address: string
) => gql`
  query {
    raw_account_states(
      parsed_nft_collection_address_address__friendly: ${collection_address}
      parsed_nft_owner_address_address__friendly: ${owner_address}
    ) {
      address
      parsed_nft_content_offchain_url
      address__friendly
      parsed_nft_reveal_mode
    }
  }
`;

const CheckIsDisintarQuery = (wc: number, adress: string) => gql`query {
    raw_transactions(
      workchain: ${wc}
      address: "${adress}"
        
      in_msg_src_addr_workchain_id: 0
      in_msg_src_addr_address_hex: "EB2EAF97EA32993470127208218748758A88374AD2BBD739FC75C9AB3A3F233D"
    ){
      gen_utime
    }
  }`;

export { RawAccountStatesQuery, CheckIsDisintarQuery, endpoint };
