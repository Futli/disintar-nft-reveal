import React, { useEffect } from "react";
import { request } from "graphql-request";
import { RawAccountStatesQuery, endpoint } from "./queries";
import { AccountState } from "./types";
import "./styles.scss";
import { NftItemComponent } from "../NftItem";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { Address } from "@ton/core";

import {
  CircularProgress,
  Container,
  Grid,
  TextField,
  Alert,
  Pagination,
} from "@mui/material";

import usePagination from "../hooks/usePagination";

const NftList = () => {
  const wallet = useTonWallet();

  const [tonConnectUi] = useTonConnectUI();

  const [data, setData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const [list, setList] = React.useState<any[]>([]);
  const [search, setSearch] = React.useState<string | undefined>();
  const [address, setAddress] = React.useState<string>("");

  let [page, setPage] = React.useState(1);
  const PER_PAGE = 10;

  const count = Math.ceil(data.length / PER_PAGE);

  let _DATA = usePagination(data, PER_PAGE);

  const handleChange = (e: any, p: any) => {
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { raw_account_states }: { raw_account_states: AccountState[] } =
          await request(
            endpoint,
            RawAccountStatesQuery(
              "EQDahyr_gPkHBPbhyrvjoHGVFGGj8vXXtL7w14AV3S2JvpTF",
              address
            )
          );
        setData(raw_account_states);
        setList(raw_account_states);
      } catch (err: any) {
        setError(err.message);
      }
      setLoading(false);
    };
    setLoading(true);

    if (wallet) {
      const addressFriendly =
        wallet?.account &&
        Address.parseRaw(wallet.account.address).toString({
          bounceable: false,
        });
      setAddress(addressFriendly ?? "");
    }

    if (address) {
      fetchData();
    }
  }, [wallet, address]);

  const sendTx = (tx: any) => {
    tonConnectUi.sendTransaction(tx);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);
    const filteredData = data?.filter((item) =>
      item?.address__friendly.toLowerCase().includes(searchTerm)
    );
    setList(filteredData);
  };

  if (!wallet) {
    return (
      <Container maxWidth="lg">
        <Alert severity="info">Connect Wallet</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ pb: 8 }}>
      <TextField
        id="outlined-basic"
        className="state-list-search__input"
        placeholder="Search"
        onChange={handleSearch}
        label="Search"
        variant="filled"
        sx={{ mb: 4 }}
      />
      {address && (
        <Alert sx={{ mb: 2 }} severity="success">
          Connected to {address}
        </Alert>
      )}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !data?.length && (
        <Alert sx={{ mb: 2 }} severity="info">
          No NFTs found
        </Alert>
      )}
      <Grid
        container
        spacing={{ xs: 1, md: 2 }}
        columns={{ xs: 2, sm: 4, md: 8 }}
      >
        {loading ? (
          <CircularProgress sx={{ margin: "auto", mt: 8 }} />
        ) : (
          !search &&
          _DATA.currentData().map((item, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <NftItemComponent sendTx={sendTx} item={item} />
            </Grid>
          ))
        )}
        {search &&
          list.map((item, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <NftItemComponent sendTx={sendTx} item={item} />
            </Grid>
          ))}
      </Grid>
      {!search && (
        <Pagination
          count={count}
          sx={{ mt: 2, color: "white" }}
          size="large"
          page={page}
          color="primary"
          shape="rounded"
          onChange={handleChange}
        />
      )}
    </Container>
  );
};

export { NftList };
