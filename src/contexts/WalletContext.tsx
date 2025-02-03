import React, { createContext, useContext, useState } from "react";

interface WalletContextType {
  activeWallet: string | null;
  setActiveWallet: (wallet: string | null) => void;
  mnemonicConfirmed: boolean;
  setMnemonicConfirmed: (confirmed: boolean) => void;
  walletType: "solana" | "ethereum" | null;
  setWalletType: (type: "solana" | "ethereum" | null) => void;
  currentMnemonic: string;
  setCurrentMnemonic: (mnemonic: string) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [activeWallet, setActiveWallet] = useState<string | null>(null);
  const [mnemonicConfirmed, setMnemonicConfirmed] = useState(false);
  const [walletType, setWalletType] = React.useState<
    "solana" | "ethereum" | null
  >(null);
  const [currentMnemonic, setCurrentMnemonic] = useState("");
  return (
    <WalletContext.Provider
      value={{
        activeWallet,
        setActiveWallet,
        mnemonicConfirmed,
        setMnemonicConfirmed,
        walletType,
        setWalletType,
        currentMnemonic,
        setCurrentMnemonic,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
