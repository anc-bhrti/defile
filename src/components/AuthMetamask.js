// MetaMaskAuth.js
import React, { useEffect, useState } from 'react';
import { useSDK } from "@metamask/sdk-react";

const AuthMetamask = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const { sdk } = useSDK();

  // Function to check if MetaMask is connected
  const checkConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
        } else {
          setAccount(null);
          setIsConnected(false);
        }
      } catch (error) {
        console.error("Error checking MetaMask connection:", error);
        setAccount(null);
        setIsConnected(false);
      }
    }
  };

  // Initial check for MetaMask installation and connection
  useEffect(() => {
    const checkMetaMask = async () => {
      if (window.ethereum) {
        setIsMetaMaskInstalled(true);
        await checkConnection();

        // Listen for account changes
        window.ethereum.on('accountsChanged', (accounts) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setIsConnected(true);
          } else {
            setAccount(null);
            setIsConnected(false);
          }
        });

        // Listen for chain changes
        window.ethereum.on('chainChanged', () => {
          checkConnection();
        });

        // Listen for disconnect
        window.ethereum.on('disconnect', () => {
          setAccount(null);
          setIsConnected(false);
        });
      } else {
        setIsMetaMaskInstalled(false);
        setIsConnected(false);
      }
    };

    checkMetaMask();

    // Cleanup listeners when component unmounts
    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
        window.ethereum.removeAllListeners('disconnect');
      }
    };
  }, []);

  const connect = async () => {
    if (!window.ethereum) {
      const userWantsToInstall = window.confirm(
        "MetaMask is not installed. Do you want to go to the MetaMask website?"
      );
      if (userWantsToInstall) {
        window.open("https://metamask.io/download.html", "_blank");
      }
      return;
    }

    try {
      const accounts = await sdk?.connect();
      if (accounts?.[0]) {
        setAccount(accounts[0]);
        setIsConnected(true);
      } else {
        setIsConnected(false);
        setAccount(null);
      }
    } catch (err) {
      console.warn("Failed to connect...", err);
      setIsConnected(false);
      setAccount(null);
    }
  };

  if (!isMetaMaskInstalled) {
    return (
      <div className="flex items-center justify-center flex-1 flex-col">
        <h1 className="text-xl font-semibold mb-4">MetaMask is not installed</h1>
        <button 
          onClick={() => window.open("https://metamask.io/download.html", "_blank")}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Install MetaMask
        </button>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center flex-1 flex-col">
        <h1 className="text-xl font-semibold mb-4">Please connect to MetaMask to use the application</h1>
        <button 
          onClick={connect}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Connect MetaMask
        </button>
      </div>
    );
  }

  return children;
};

export default AuthMetamask;