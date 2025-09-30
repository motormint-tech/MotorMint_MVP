import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, Shield, Eye, EyeOff, Loader2 } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConnectWalletModal = ({ isOpen, onClose }: ConnectWalletModalProps) => {
  const { connectWallet, isConnecting } = useWallet();
  const [selectedWallet, setSelectedWallet] = useState<'metamask' | 'walletconnect' | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleConnect = async () => {
    if (!selectedWallet) return;
    
    const success = await connectWallet(selectedWallet, password);
    if (success) {
      setPassword("");
      setSelectedWallet(null);
      onClose();
    }
  };

  const wallets = [
    {
      id: 'metamask' as const,
      name: 'MetaMask',
      description: 'Connect using browser extension',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
          <path d="M36.5 3.5L22.3 14l2.6-6.2L36.5 3.5z" fill="#E17726" stroke="#E17726" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.5 3.5l14 10.6-2.4-6.3L3.5 3.5z" fill="#E27625" stroke="#E27625" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M31.4 26.4l-3.8 5.8 8 2.2 2.3-7.8-6.5-.2z" fill="#E27625" stroke="#E27625" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2.1 26.6l2.3 7.8 8-2.2-3.8-5.8-6.5.2z" fill="#E27625" stroke="#E27625" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 17.5l-2.3 3.4 8 .4-.3-8.6-5.4 4.8z" fill="#E27625" stroke="#E27625" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M28 17.5l-5.5-4.9-.2 8.7 8-.4-2.3-3.4z" fill="#E27625" stroke="#E27625" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12.4 32.2l4.8-2.3-4.2-3.2-.6 5.5z" fill="#E27625" stroke="#E27625" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22.8 29.9l4.8 2.3-.6-5.5-4.2 3.2z" fill="#E27625" stroke="#E27625" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: 'walletconnect' as const,
      name: 'WalletConnect',
      description: 'Scan with your mobile wallet',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
          <path d="M12 14.5c4.4-4.3 11.6-4.3 16 0l.5.5c.2.2.2.6 0 .8l-1.7 1.7c-.1.1-.3.1-.4 0l-.7-.7c-3.1-3-8.1-3-11.2 0l-.8.8c-.1.1-.3.1-.4 0l-1.7-1.7c-.2-.2-.2-.6 0-.8l.4-.6z" fill="#3B99FC"/>
          <path d="M31.4 18l1.5 1.5c.2.2.2.6 0 .8L24.2 29c-.2.2-.6.2-.8 0l-3.4-3.4-3.4 3.4c-.2.2-.6.2-.8 0l-8.7-8.7c-.2-.2-.2-.6 0-.8l1.5-1.5c.2-.2.6-.2.8 0l6.2 6.1c.1.1.3.1.4 0l6.2-6.1c.2-.2.6-.2.8 0z" fill="#3B99FC"/>
        </svg>
      ),
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary" />
            Connect Your Wallet
          </DialogTitle>
          <DialogDescription>
            Choose your preferred wallet to access the MotorMint marketplace
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Wallet Selection */}
          <div className="grid grid-cols-2 gap-3">
            {wallets.map((wallet) => (
              <button
                key={wallet.id}
                onClick={() => setSelectedWallet(wallet.id)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  selectedWallet === wallet.id
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="mb-2">{wallet.icon}</div>
                <p className="font-semibold text-sm">{wallet.name}</p>
                <p className="text-xs text-muted-foreground">{wallet.description}</p>
              </button>
            ))}
          </div>

          {/* Password Input */}
          {selectedWallet && (
            <div className="space-y-2 pt-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                Wallet Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your wallet password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Enter any password (min. 4 characters) to connect for the demo
              </p>
            </div>
          )}

          {/* Connect Button */}
          <Button
            onClick={handleConnect}
            disabled={!selectedWallet || password.length < 4 || isConnecting}
            className="w-full rounded-full"
          >
            {isConnecting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </>
            )}
          </Button>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Non-Custodial
            </span>
            <span>•</span>
            <span>Your keys, your assets</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectWalletModal;
