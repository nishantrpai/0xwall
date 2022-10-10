import React, { useState, useEffect, useMemo, useCallback } from "react";
import { injected } from "components/Connectors";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import Web3Token from "web3-token";

export const MetaMaskContext = React.createContext(null);

export const MetaMaskProvider = ({ children }) => {
  const { activate, account, library, connector, active, deactivate } =
    useWeb3React();

  const [isActive, setIsActive] = useState(false);
  const [shouldDisable, setShouldDisable] = useState(false); // Should disable connect button while connecting to MetaMask
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState("");

  // Check when App is Connected or Disconnected to MetaMask
  const handleIsActive = useCallback(async () => {
    console.log("App is connected with MetaMask ", active);
    setIsActive(active);
  }, [active]);

  useEffect(() => {
    handleIsActive();
  }, [handleIsActive]);

  // Connect to MetaMask wallet
  const connect = async () => {
    console.log("Connecting to MetaMask...");
    setShouldDisable(true);
    try {
      await activate(injected).then(async () => {
        setShouldDisable(false);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const web3token = await Web3Token.sign(
          async (msg) => await signer.signMessage(msg),
          "1d"
        );
        setToken(web3token);
      });
    } catch (error) {
      console.log("Error on connecting: ", error);
    }
  };

  // Disconnect from Metamask wallet
  const disconnect = async () => {
    console.log("Disconnecting wallet from App...");
    try {
      await deactivate();
    } catch (error) {
      console.log("Error on disconnnect: ", error);
    }
  };

  const values = useMemo(
    () => ({
      isActive,
      account,
      isLoading,
      token,
      connect,
      disconnect,
      shouldDisable,
    }),
    [isActive, isLoading, shouldDisable, account, token]
  );

  return (
    <MetaMaskContext.Provider value={values}>
      {children}
    </MetaMaskContext.Provider>
  );
};

export default function useMetaMask() {
  const context = React.useContext(MetaMaskContext);

  if (context === undefined) {
    throw new Error(
      "useMetaMask hook must be used with a MetaMaskProvider component"
    );
  }

  return context;
}
