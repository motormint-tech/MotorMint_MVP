import { Wallet, Lock, Truck, CheckCircle, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Wallet,
      title: "Connect Your Wallet",
      description: "Link your Web3 wallet (MetaMask, WalletConnect) to access the MotorMint marketplace. Your wallet is your identity—no email or passwords needed.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Lock,
      title: "Lock Funds in Escrow",
      description: "When you find your vehicle, lock your crypto in our audited smart contract. Your funds are secure until you confirm delivery.",
      color: "text-amber-400",
      bgColor: "bg-amber-400/10",
    },
    {
      icon: Truck,
      title: "Await Delivery",
      description: "The seller transfers the physical vehicle to you. During this time, your funds remain safely escrowed on the blockchain.",
      color: "text-violet-400",
      bgColor: "bg-violet-400/10",
    },
    {
      icon: CheckCircle,
      title: "Confirm & Transfer",
      description: "Once you receive and verify the vehicle, confirm receipt. The smart contract automatically transfers ownership NFT to your wallet.",
      color: "text-emerald-400",
      bgColor: "bg-emerald-400/10",
    },
  ];

  return (
    <section className="py-16 px-6 bg-card/50 border-y border-border">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How Smart Contract Escrow Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            No intermediaries. No trust required. Just code that executes exactly as programmed, 
            protecting both buyers and sellers in every on-chain transaction.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Connector Arrow */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-3 z-10">
                  <ArrowRight className="w-6 h-6 text-muted-foreground/30" />
                </div>
              )}
              
              <div className="bg-card rounded-xl p-6 border border-border h-full">
                <div className={`w-14 h-14 rounded-xl ${step.bgColor} flex items-center justify-center mb-4`}>
                  <step.icon className={`w-7 h-7 ${step.color}`} />
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    Step {index + 1}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
            Non-Custodial
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full" />
            Audited Smart Contracts
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-violet-500 rounded-full" />
            Immutable Records
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full" />
            Gas-Optimized
          </span>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
