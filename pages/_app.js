import Web3 from "web3";
import { Web3ReactProvider } from "@web3-react/core";
import { MetaMaskProvider } from "hooks/metamask";
import "styles/index.css";

function getLibrary(provider, connector) {
  return new Web3(provider);
}

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <MetaMaskProvider>
        {getLayout(<Component {...pageProps} />)}
      </MetaMaskProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
