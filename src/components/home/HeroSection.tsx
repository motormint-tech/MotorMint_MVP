import { ArrowRight, Shield, Wallet, Globe, Zap, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Web3Badge from "@/components/Web3Badge";
import heroCar1 from "@/assets/hero-car-1.jpg";
import heroCar2 from "@/assets/hero-car-2.jpg";
import heroCar3 from "@/assets/hero-car-3.jpg";

const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl opacity-30" />
      
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Web3Badge variant="network" network="Polygon Mainnet" size="md" />
              <span className="text-xs text-muted-foreground">Testnet Mode Active</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              The Future of{" "}
              <span className="text-gradient-cyan">Vehicle</span>{" "}
              <span className="text-gradient-cyan">Ownership</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              MotorMint is a blockchain-powered marketplace where vehicles are tokenized as 
              digital assets. Buy, sell, and transfer ownership globally using cryptocurrency 
              with full transparency and security.
            </p>

            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">On-Chain Verified</p>
                  <p className="text-xs text-muted-foreground">VIN hashed on blockchain</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Smart Contract Escrow</p>
                  <p className="text-xs text-muted-foreground">Trustless transactions</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Instant Transfer</p>
                  <p className="text-xs text-muted-foreground">NFT ownership in seconds</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Global Access</p>
                  <p className="text-xs text-muted-foreground">No borders, no banks</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/listings">
                <Button 
                  size="lg" 
                  className="rounded-full gap-2"
                >
                  <Wallet className="w-5 h-5" />
                  Browse Marketplace
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/submit">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-full border-border hover:bg-secondary group"
                >
                  Tokenize Your Vehicle
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Image Grid */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              {/* Main large image */}
              <div className="row-span-2 relative">
                <img
                  src={heroCar1}
                  alt="Tokenized Vehicle"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-sm rounded-xl p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Token ID</p>
                      <p className="text-sm font-mono font-bold text-primary">MOTO-0x8A2F</p>
                    </div>
                    <Web3Badge variant="verified" size="sm" />
                  </div>
                </div>
              </div>
              {/* Top right image */}
              <div className="relative">
                <img
                  src={heroCar2}
                  alt="NFT Vehicle"
                  className="w-full h-48 object-cover rounded-2xl shadow-xl"
                />
                <div className="absolute top-3 right-3 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  Available
                </div>
              </div>
              {/* Bottom right image */}
              <div className="relative">
                <img
                  src={heroCar3}
                  alt="Blockchain Car"
                  className="w-full h-48 object-cover rounded-2xl shadow-xl"
                />
                <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs">
                  <span className="font-mono text-primary">32.46 ETH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
