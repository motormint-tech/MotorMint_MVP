import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Wallet, 
  ChevronDown, 
  LogOut, 
  Copy, 
  ExternalLink,
  Car
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWallet } from "@/contexts/WalletContext";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import ConnectWalletModal from "./ConnectWalletModal";

const ConnectWalletButton = () => {
  const { wallet, disconnectWallet, formatAddress } = useWallet();
  const { toast } = useToast();
  const [showModal, setShowModal] = useState(false);

  const copyAddress = () => {
    if (wallet.address) {
      navigator.clipboard.writeText(wallet.address);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  if (!wallet.isConnected) {
    return (
      <>
        <Button 
          onClick={() => setShowModal(true)}
          className="rounded-full gap-2"
        >
          <Wallet className="w-4 h-4" />
          Connect Wallet
        </Button>
        <ConnectWalletModal 
          isOpen={showModal} 
          onClose={() => setShowModal(false)} 
        />
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full gap-2 border-primary/30 hover:border-primary">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="font-mono text-sm">{formatAddress(wallet.address || '')}</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-3 py-2 border-b border-border">
          <p className="text-xs text-muted-foreground">Connected to</p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm font-medium">{wallet.network}</span>
            <span className="text-xs bg-violet-500/20 text-violet-400 px-2 py-0.5 rounded-full">
              {wallet.networkId}
            </span>
          </div>
        </div>
        
        <div className="px-3 py-2 border-b border-border">
          <p className="text-xs text-muted-foreground">Balance</p>
          <p className="text-sm font-bold">{wallet.balance} MATIC</p>
        </div>

        <DropdownMenuItem onClick={copyAddress} className="cursor-pointer">
          <Copy className="w-4 h-4 mr-2" />
          Copy Address
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <a 
            href={`https://polygonscan.com/address/${wallet.address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center cursor-pointer"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View on Explorer
          </a>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link to="/my-garage" className="flex items-center cursor-pointer">
            <Car className="w-4 h-4 mr-2" />
            My Garage
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={disconnectWallet}
          className="text-destructive focus:text-destructive cursor-pointer"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ConnectWalletButton;
