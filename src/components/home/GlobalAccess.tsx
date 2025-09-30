import { Globe, Wallet, Clock, Shield, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const GlobalAccess = () => {
  const features = [
    {
      icon: Globe,
      title: "Borderless Transactions",
      description: "Buy and sell vehicles across any country. Cryptocurrency removes banking barriers.",
    },
    {
      icon: Wallet,
      title: "Self-Custody",
      description: "Your keys, your assets. No platform can freeze or seize your tokenized vehicles.",
    },
    {
      icon: Clock,
      title: "24/7 Marketplace",
      description: "The blockchain never sleeps. Trade anytime, anywhere in the world.",
    },
    {
      icon: Shield,
      title: "Trustless Security",
      description: "Smart contracts eliminate counterparty risk. Code is law.",
    },
    {
      icon: Users,
      title: "Community Governed",
      description: "Future DAO governance will let token holders shape the platform's direction.",
    },
    {
      icon: Zap,
      title: "Instant Settlement",
      description: "No waiting for bank transfers. Ownership transfers in seconds, not days.",
    },
  ];

  return (
    <section className="py-16 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-violet-500/5" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <Globe className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Global Access, Decentralized Trust</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Future of Vehicle Ownership is{" "}
            <span className="text-gradient-cyan">On-Chain</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            MotorMint is building the infrastructure for a truly global, transparent, and 
            trustless vehicle marketplace powered by blockchain technology.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature) => (
            <div 
              key={feature.title}
              className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border hover:border-primary/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            Ready to experience the future of vehicle ownership?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/listings">
              <Button size="lg" className="rounded-full gap-2">
                <Wallet className="w-5 h-5" />
                Explore Marketplace
              </Button>
            </Link>
            <Link to="/faq">
              <Button variant="outline" size="lg" className="rounded-full">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Testnet Notice */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-xs text-amber-400">
              Currently running on Polygon Testnet for demonstration purposes
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalAccess;
