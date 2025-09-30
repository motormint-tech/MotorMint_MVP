import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Lock, 
  Truck, 
  CheckCircle2, 
  ArrowRight,
  Shield,
  Clock,
  Wallet,
  FileCheck
} from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface EscrowFlowProps {
  vehicleTitle: string;
  priceEth: string;
  tokenId: string;
  onInitiateEscrow?: () => void;
}

type EscrowStep = 'idle' | 'connecting' | 'locking' | 'awaiting' | 'confirming' | 'complete';

const EscrowFlow = ({ vehicleTitle, priceEth, tokenId, onInitiateEscrow }: EscrowFlowProps) => {
  const { wallet } = useWallet();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<EscrowStep>('idle');
  const [isProcessing, setIsProcessing] = useState(false);

  const steps = [
    {
      id: 'lock',
      title: 'Lock Funds',
      description: 'Your crypto is held securely in a smart contract',
      icon: Lock,
    },
    {
      id: 'delivery',
      title: 'Await Delivery',
      description: 'Seller transfers the vehicle to you',
      icon: Truck,
    },
    {
      id: 'confirm',
      title: 'Confirm Receipt',
      description: 'Verify the vehicle matches the listing',
      icon: FileCheck,
    },
    {
      id: 'transfer',
      title: 'Auto Transfer',
      description: 'Ownership NFT transfers to your wallet',
      icon: CheckCircle2,
    },
  ];

  const handleInitiateEscrow = async () => {
    if (!wallet.isConnected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to initiate an on-chain transaction.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setCurrentStep('locking');

    // Simulate escrow process
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Funds Locked in Smart Contract",
      description: `${priceEth} ETH secured for ${vehicleTitle}`,
    });

    setCurrentStep('awaiting');
    setIsProcessing(false);
    onInitiateEscrow?.();
  };

  return (
    <div className="space-y-6">
      {/* Smart Contract Badge */}
      <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 border border-primary/20 rounded-lg">
        <Shield className="w-4 h-4 text-primary" />
        <span className="text-sm text-primary font-medium">
          Protected by Smart Contract Escrow
        </span>
      </div>

      {/* Escrow Steps Visual */}
      <div className="relative">
        <div className="flex justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = 
              (currentStep === 'locking' && index === 0) ||
              (currentStep === 'awaiting' && index === 1) ||
              (currentStep === 'confirming' && index === 2) ||
              (currentStep === 'complete' && index === 3);
            const isComplete = 
              (currentStep === 'awaiting' && index === 0) ||
              (currentStep === 'confirming' && index <= 1) ||
              (currentStep === 'complete' && index <= 2);

            return (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                  isComplete 
                    ? "bg-primary border-primary text-primary-foreground" 
                    : isActive
                    ? "bg-primary/20 border-primary text-primary animate-pulse"
                    : "bg-card border-border text-muted-foreground"
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className={cn(
                  "text-[10px] mt-2 text-center max-w-[70px]",
                  isActive || isComplete ? "text-primary font-medium" : "text-muted-foreground"
                )}>
                  {step.title}
                </p>
              </div>
            );
          })}
        </div>
        {/* Progress Line */}
        <div className="absolute top-5 left-[10%] right-[10%] h-0.5 bg-border -z-10">
          <div 
            className="h-full bg-primary transition-all duration-500"
            style={{
              width: currentStep === 'idle' ? '0%' 
                : currentStep === 'locking' ? '15%'
                : currentStep === 'awaiting' ? '40%'
                : currentStep === 'confirming' ? '70%'
                : currentStep === 'complete' ? '100%' : '0%'
            }}
          />
        </div>
      </div>

      {/* Action Button */}
      {currentStep === 'idle' && (
        <Button 
          className="w-full gap-2 h-12 text-base rounded-full"
          onClick={handleInitiateEscrow}
          disabled={isProcessing}
        >
          <Lock className="w-5 h-5" />
          Lock Funds in Smart Contract
          <ArrowRight className="w-4 h-4" />
        </Button>
      )}

      {currentStep === 'locking' && (
        <Button className="w-full gap-2 h-12 text-base rounded-full" disabled>
          <Clock className="w-5 h-5 animate-spin" />
          Locking Funds...
        </Button>
      )}

      {currentStep === 'awaiting' && (
        <div className="space-y-3">
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 text-center">
            <Truck className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <p className="text-sm text-amber-400 font-medium">Awaiting Vehicle Delivery</p>
            <p className="text-xs text-muted-foreground mt-1">
              The seller has been notified. Your funds are secured.
            </p>
          </div>
          <Button 
            variant="outline" 
            className="w-full gap-2"
            onClick={() => setCurrentStep('confirming')}
          >
            <CheckCircle2 className="w-4 h-4" />
            I've Received the Vehicle
          </Button>
        </div>
      )}

      {currentStep === 'confirming' && (
        <Button 
          className="w-full gap-2 h-12 text-base rounded-full bg-emerald-600 hover:bg-emerald-700"
          onClick={async () => {
            setIsProcessing(true);
            await new Promise(resolve => setTimeout(resolve, 2000));
            setCurrentStep('complete');
            setIsProcessing(false);
            toast({
              title: "🎉 Ownership Transferred!",
              description: `Token ${tokenId} is now in your wallet.`,
            });
          }}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Clock className="w-5 h-5 animate-spin" />
              Confirming on Blockchain...
            </>
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5" />
              Confirm Receipt & Transfer Ownership
            </>
          )}
        </Button>
      )}

      {currentStep === 'complete' && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 text-center">
          <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
          <p className="text-lg text-emerald-400 font-bold">Transaction Complete!</p>
          <p className="text-sm text-muted-foreground mt-1">
            Token {tokenId} has been transferred to your wallet.
          </p>
          <Button 
            variant="link" 
            className="text-primary mt-2"
            onClick={() => window.open('https://polygonscan.com', '_blank')}
          >
            View Transaction on PolygonScan →
          </Button>
        </div>
      )}

      {/* Trust Indicators */}
      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
        <span className="flex items-center gap-1">
          <Wallet className="w-3 h-3" />
          Non-Custodial
        </span>
        <span className="flex items-center gap-1">
          <Shield className="w-3 h-3" />
          Audited Contract
        </span>
        <span className="flex items-center gap-1">
          <Lock className="w-3 h-3" />
          Immutable
        </span>
      </div>
    </div>
  );
};

export default EscrowFlow;
