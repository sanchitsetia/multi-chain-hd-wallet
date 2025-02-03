import { useState } from "react";

import { Shield, Copy, CheckCircle } from "lucide-react";

import { useWallet } from "../contexts/WalletContext";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useToast } from "../hooks/use-toast";
import { generateMnemonic } from "bip39";

const SAMPLE_MNEMONIC =
  "witch collapse practice feed shame open despair creek road again ice least";

export function WalletCreation() {
  const { setMnemonicConfirmed } = useWallet();
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const [currentMnemonic, setCurrentMnemonic] = useState("");

  const handleCopyMnemonic = () => {
    navigator.clipboard.writeText(SAMPLE_MNEMONIC);
    setCopied(true);
    toast({
      title: "Mnemonic phrase copied!",
      description: "Please store it in a safe place.",
    });
  };

  const newSeedPhase = () => {
    const mn = generateMnemonic();
    console.log(mn);
    setCurrentMnemonic(mn);
    setShowMnemonic(true);
  };

  const handleConfirm = () => {
    if (!copied) {
      toast({
        title: "Please copy your mnemonic phrase",
        description: "You need to save these words before continuing.",
        variant: "destructive",
      });
      return;
    }
    setMnemonicConfirmed(true);
  };

  return (
    <Card className="w-full max-w-md p-6 bg-card text-card-foreground animate-fadeIn">
      <div className="flex flex-col items-center space-y-6">
        <Shield className="w-12 h-12 text-primary" />
        <h2 className="text-2xl font-bold text-center">Create New Wallet</h2>

        <div className="space-y-4 w-full">
          <p className="text-sm text-muted text-center">
            Your secret recovery phrase is the key to your wallet. Never share
            it with anyone!
          </p>

          {!showMnemonic ? (
            <Button className="w-full" onClick={newSeedPhase}>
              Create New Seed Phrase
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-secondary rounded-lg">
                <div className="grid grid-cols-3 gap-2">
                  {SAMPLE_MNEMONIC.split(" ").map((word, index) => (
                    <div key={index} className="text-sm p-2 bg-card rounded">
                      <span className="text-muted">{index + 1}.</span> {word}
                    </div>
                  ))}
                </div>
              </div>

              <Button
                className="w-full"
                variant={copied ? "secondary" : "default"}
                onClick={handleCopyMnemonic}
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4 mr-2" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                {copied ? "Copied!" : "Copy to Clipboard"}
              </Button>

              <Button className="w-full" onClick={handleConfirm}>
                I've Saved My Recovery Phrase
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
