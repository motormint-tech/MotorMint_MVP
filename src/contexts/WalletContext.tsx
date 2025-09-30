import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";

interface WalletState {
  isConnected: boolean;
  address: string | null;
  network: string;
  networkId: number;
  balance: string;
  walletType: 'metamask' | 'walletconnect' | null;
}

interface OwnedVehicle {
  id: string;
  tokenId: string;
  title: string;
  image: string;
  acquiredDate: string;
  transactionHash: string;
  status: 'owned' | 'in_escrow' | 'pending_delivery';
}

interface WalletContextType {
  wallet: WalletState;
  ownedVehicles: OwnedVehicle[];
  connectWallet: (type: 'metamask' | 'walletconnect', password: string) => Promise<boolean>;
  disconnectWallet: () => void;
  isConnecting: boolean;
  formatAddress: (address: string) => string;
  addOwnedVehicle: (vehicle: OwnedVehicle) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Mock wallet addresses and passwords for demo
const MOCK_WALLETS = {
  metamask: {
    address: '0x742d35Cc6634C0532925a3b844Bc9e7595f1B6a9',
    password: 'metamask123',
  },
  walletconnect: {
    address: '0x8ba1f109551bD432803012645Ac136ddd64DBA72', 
    password: 'wallet123',
  },
};

export function WalletProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    network: 'Polygon Mainnet',
    networkId: 137,
    balance: '0.00',
    walletType: null,
  });

  const [ownedVehicles, setOwnedVehicles] = useState<OwnedVehicle[]>([
    {
      id: '3',
      tokenId: 'MOTO-0x8A2F',
      title: '720whp 2023 Toyota Supra GR',
      image: '/src/assets/cars/supra-yellow.jpg',
      acquiredDate: '2024-01-18',
      transactionHash: '0x8f2a...9e3b',
      status: 'owned',
    },
  ]);

  const formatAddress = useCallback((address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, []);

  const connectWallet = useCallback(async (type: 'metamask' | 'walletconnect', password: string): Promise<boolean> => {
    setIsConnecting(true);
    
    // Simulate wallet connection delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, we'll accept any password
    const walletConfig = MOCK_WALLETS[type];
    
    // Use the wallet's address
    const walletAddress = walletConfig.address;
    const randomBalance = (Math.random() * 10).toFixed(4);

    setWallet({
      isConnected: true,
      address: walletAddress,
      network: 'Polygon Mainnet',
      networkId: 137,
      balance: randomBalance,
      walletType: type,
    });

    toast({
      title: "Wallet Connected",
      description: `Connected to ${formatAddress(walletAddress)} on Polygon`,
    });

    setIsConnecting(false);
    return true;
  }, [toast, formatAddress]);

  const disconnectWallet = useCallback(() => {
    setWallet({
      isConnected: false,
      address: null,
      network: 'Polygon Mainnet',
      networkId: 137,
      balance: '0.00',
      walletType: null,
    });

    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been safely disconnected.",
    });
  }, [toast]);

  const addOwnedVehicle = useCallback((vehicle: OwnedVehicle) => {
    setOwnedVehicles(prev => [...prev, vehicle]);
  }, []);

  return (
    <WalletContext.Provider value={{
      wallet,
      ownedVehicles,
      connectWallet,
      disconnectWallet,
      isConnecting,
      formatAddress,
      addOwnedVehicle,
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
