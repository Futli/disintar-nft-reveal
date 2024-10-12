import { Address } from "@ton/core";

const addressToFriendlyBounceable = (workchain: number, address: string) => {
  if (!address) return "";
  const full = workchain + ":" + address;
  return Address.parseRaw(full).toString({ bounceable: true });
};

const walletAddressToRaw = (account: any) => {
  if (!account) return { account_wc: 0, account_address: "" };
  const [wc, address] = account.address.split(":");
  return { account_wc: +wc, account_address: address.toUpperCase() };
};

export { addressToFriendlyBounceable, walletAddressToRaw };
