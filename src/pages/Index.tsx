import { WalletCreation } from "../components/WalletCreation";
import { WalletDashboard } from "../components/WalletDashboard";
import { WalletTypeSelection } from "../components/WalletTypeSelection";
import { useWallet, WalletProvider } from "../contexts/WalletContext";

function WalletApp() {
  const { mnemonicConfirmed, walletType } = useWallet();

  return (
    <div className="min-h-screen bg-secondary p-4 flex items-center justify-center">
      {!mnemonicConfirmed && <WalletCreation />}
      {mnemonicConfirmed && !walletType && <WalletTypeSelection />}
      {mnemonicConfirmed && walletType && <WalletDashboard />}
    </div>
  );
}

const Index = () => {
  return (
    <WalletProvider>
      <WalletApp />
    </WalletProvider>
  );
};

export default Index;
