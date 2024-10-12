import "./App.scss";
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
import { Header } from "./components/Header/Header";
import { NftList } from "./components/NftList";

function App() {
  console.log(
    import.meta.env.MODE,
    "prod",
    import.meta.env.PROD,
    "dev",
    import.meta.env.DEV
  );

  return (
    <TonConnectUIProvider
      manifestUrl={
        import.meta.env.MODE === "production"
          ? "https://futli.github.io/disintar-nft-reveal/tonconnect-manifest.json"
          : "https://github.com/Futli/disintar-nft-reveal/blob/main/public/tonconnect-manifest.json"
      }
      uiPreferences={{ theme: THEME.DARK }}
      walletsListConfiguration={{
        includeWallets: [
          {
            appName: "tonwallet",
            name: "TON Wallet",
            imageUrl: "https://wallet.ton.org/assets/ui/qr-logo.png",
            aboutUrl:
              "https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd",
            universalLink: "https://wallet.ton.org/ton-connect",
            jsBridgeKey: "tonwallet",
            bridgeUrl: "https://bridge.tonapi.io/bridge",
            platforms: ["chrome", "android"],
          },
        ],
      }}
    >
      <div className="app">
        <Header />
        <NftList />
      </div>
    </TonConnectUIProvider>
  );
}

export default App;
