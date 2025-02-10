import { Wallet, ArrowUpDown, Settings } from "lucide-react";
import { useWallet } from "../contexts/WalletContext";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const SAMPLE_DATA = {
  ethereum: {
    balance: "1.245",
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    symbol: "ETH",
  },
  solana: {
    balance: "13.457",
    address: "7UX2i7SucgLMQcfZ75s3VXmZZY4YRUyJN9X1RgfMoDUi",
    symbol: "SOL",
  },
};

export function WalletDashboard() {
  const { walletType, setWalletType } = useWallet();
  const data = walletType ? SAMPLE_DATA[walletType] : null;

  if (!data) return null;

  return (
    <div className="w-full max-w-md space-y-6 animate-fadeIn">
      <Card className="p-6 bg-card">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Wallet className="w-6 h-6 text-primary mr-2" />
            <h2 className="text-xl font-bold">
              {walletType!.toUpperCase()} Wallet
            </h2>
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>

        <div className="mb-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Wallet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-3xl font-bold mb-1">
              {data.balance} {data.symbol}
            </p>
            <p className="text-sm text-muted-foreground">
              {data.address.slice(0, 6)}...{data.address.slice(-4)}
            </p>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1">
              Send
              <ArrowUpDown className="w-4 h-4 ml-2" />
            </Button>
            <Button className="flex-1" variant="secondary">
              Receive
              <Wallet className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-card">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="text-center text-muted py-8">
          No recent transactions
        </div>
      </Card>
    </div>
  );
}
