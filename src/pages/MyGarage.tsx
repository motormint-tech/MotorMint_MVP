import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Web3Badge from "@/components/Web3Badge";
import { useWallet } from "@/contexts/WalletContext";
import ConnectWalletModal from "@/components/ConnectWalletModal";
import { 
  Wallet, 
  Car, 
  ArrowRight, 
  ExternalLink, 
  Clock,
  Shield,
  Globe,
  Plus
} from "lucide-react";

// Import car images
import supraYellow from "@/assets/cars/supra-yellow.jpg";
import camaroRed from "@/assets/cars/camaro-red.jpg";
import gtrSilver from "@/assets/cars/gtr-silver.jpg";

const mockOwnedVehicles = [
  {
    id: '3',
    tokenId: 'MOTO-0x8A2F',
    title: '720whp 2023 Toyota Supra GR',
    image: supraYellow,
    acquiredDate: '2024-01-18',
    transactionHash: '0x8f2a...9e3b',
    status: 'owned' as const,
    valueEth: '22.61',
  },
  {
    id: '7',
    tokenId: 'MOTO-0x4C1D',
    title: '1640awhp 2020 Nissan GT-R NISMO',
    image: gtrSilver,
    acquiredDate: '2024-01-10',
    transactionHash: '0x3d7b...2f1a',
    status: 'owned' as const,
    valueEth: '82.61',
  },
];

const mockPendingVehicles = [
  {
    id: '2',
    tokenId: 'MOTO-0x9B3E',
    title: '850whp 2024 Chevrolet Camaro ZL1',
    image: camaroRed,
    escrowDate: '2024-01-25',
    status: 'in_escrow' as const,
    valueEth: '25.94',
  },
];

const MyGarage = () => {
  const { wallet, formatAddress } = useWallet();
  const [showModal, setShowModal] = useState(false);

  if (!wallet.isConnected) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-6">
            <div className="max-w-md mx-auto text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wallet className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Connect Your Wallet</h1>
              <p className="text-muted-foreground mb-8">
                Connect your Web3 wallet to view your tokenized vehicle assets and manage your on-chain garage.
              </p>
              <Button 
                size="lg" 
                className="rounded-full gap-2"
                onClick={() => setShowModal(true)}
              >
                <Wallet className="w-5 h-5" />
                Connect Wallet
              </Button>
            </div>
          </div>
        </main>
        <Footer />
        <ConnectWalletModal 
          isOpen={showModal} 
          onClose={() => setShowModal(false)} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold">My Garage</h1>
                <Web3Badge variant="verified" size="md" />
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Wallet className="w-4 h-4" />
                  {formatAddress(wallet.address || '')}
                </span>
                <Web3Badge variant="network" network={wallet.network} size="sm" />
              </div>
            </div>

            <div className="flex gap-3">
              <Link to="/listings">
                <Button variant="outline" className="rounded-full gap-2">
                  <Plus className="w-4 h-4" />
                  Browse Vehicles
                </Button>
              </Link>
              <Link to="/submit">
                <Button className="rounded-full gap-2">
                  <Car className="w-4 h-4" />
                  Tokenize Your Vehicle
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: 'Vehicles Owned', value: mockOwnedVehicles.length.toString(), icon: Car },
              { label: 'In Escrow', value: mockPendingVehicles.length.toString(), icon: Clock },
              { label: 'Total Value', value: '130.55 ETH', icon: Shield },
              { label: 'Network', value: 'Polygon', icon: Globe },
            ].map((stat) => (
              <div key={stat.label} className="bg-card rounded-xl p-4 border border-border">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <stat.icon className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wider">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Owned Vehicles */}
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Owned Vehicles
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockOwnedVehicles.map((vehicle) => (
                <Link
                  key={vehicle.id}
                  to={`/listing/${vehicle.id}`}
                  className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all"
                >
                  <div className="relative aspect-[4/3]">
                    <img
                      src={vehicle.image}
                      alt={vehicle.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-emerald-500/90 text-white border-0">
                        Owned
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-mono">
                      {vehicle.tokenId}
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {vehicle.title}
                    </h3>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-foreground" viewBox="0 0 320 512" fill="currentColor">
                          <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" />
                        </svg>
                        <span className="font-bold">{vehicle.valueEth} ETH</span>
                      </div>
                      <span className="text-muted-foreground text-xs">
                        Acquired {new Date(vehicle.acquiredDate).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        TX: <code className="font-mono">{vehicle.transactionHash}</code>
                      </span>
                      <ExternalLink className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Pending Transactions */}
          {mockPendingVehicles.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" />
                Pending Transactions
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockPendingVehicles.map((vehicle) => (
                  <Link
                    key={vehicle.id}
                    to={`/listing/${vehicle.id}`}
                    className="group bg-card rounded-xl overflow-hidden border border-amber-500/30 hover:border-amber-500/50 transition-all"
                  >
                    <div className="relative aspect-[4/3]">
                      <img
                        src={vehicle.image}
                        alt={vehicle.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105 opacity-80"
                      />
                      <div className="absolute inset-0 bg-amber-500/10" />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-amber-500/90 text-white border-0 gap-1">
                          <Clock className="w-3 h-3" />
                          In Escrow
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-mono">
                        {vehicle.tokenId}
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {vehicle.title}
                      </h3>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-amber-400" viewBox="0 0 320 512" fill="currentColor">
                            <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" />
                          </svg>
                          <span className="font-bold text-amber-400">{vehicle.valueEth} ETH</span>
                        </div>
                        <span className="text-muted-foreground text-xs">Locked</span>
                      </div>

                      <div className="bg-amber-500/10 rounded-lg p-2 text-center">
                        <p className="text-xs text-amber-400">Awaiting delivery confirmation</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Global Access Banner */}
          <section className="mt-16">
            <div className="bg-gradient-to-r from-primary/10 via-violet-500/10 to-primary/10 rounded-2xl p-8 border border-primary/20 text-center">
              <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Global Access, Borderless Transactions</h3>
              <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                Your tokenized vehicles can be bought, sold, or transferred anywhere in the world 
                using cryptocurrency. No banks, no borders, no delays.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-primary" />
                  Trustless Escrow
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-primary" />
                  24/7 Trading
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Wallet className="w-4 h-4 text-primary" />
                  Self-Custody
                </span>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyGarage;
