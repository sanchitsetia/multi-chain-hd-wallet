import { useWallet } from "../contexts/WalletContext";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export function WalletTypeSelection() {
  const { setWalletType } = useWallet();

  return (
    <Card className="w-full max-w-md p-6 bg-card text-card-foreground animate-fadeIn">
      <h2 className="text-2xl font-bold text-center mb-6">
        Select Wallet Type
      </h2>
      <div className="space-y-4">
        <Button
          className="w-full h-16 text-lg"
          onClick={() => setWalletType("ethereum")}
        >
          Ethereum Wallet
        </Button>
        <Button
          className="w-full h-16 text-lg"
          variant="secondary"
          onClick={() => setWalletType("solana")}
        >
          Solana Wallet
        </Button>
      </div>
    </Card>
  );
}
