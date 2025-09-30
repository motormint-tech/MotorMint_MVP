import { Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Web3Badge from "./Web3Badge";

interface TokenInfoProps {
  tokenId: string;
  contractAddress?: string;
  network?: string;
  mintDate?: string;
  vinHash?: string;
  className?: string;
}

const TokenInfo = ({ 
  tokenId, 
  contractAddress = "0x1234...5678", 
  network = "Polygon",
  mintDate,
  vinHash,
  className 
}: TokenInfoProps) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  return (
    <div className={`bg-card/50 rounded-xl p-4 border border-primary/20 space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          On-Chain Asset Info
        </h4>
        <Web3Badge variant="network" network={network} size="sm" />
      </div>

      <div className="space-y-2 text-sm">
        {/* Token ID */}
        <div className="flex items-center justify-between py-2 border-b border-border/50">
          <span className="text-muted-foreground">Token ID</span>
          <div className="flex items-center gap-2">
            <code className="text-primary font-mono text-xs bg-primary/10 px-2 py-0.5 rounded">
              {tokenId}
            </code>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6"
              onClick={() => copyToClipboard(tokenId, "Token ID")}
            >
              <Copy className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Contract Address */}
        <div className="flex items-center justify-between py-2 border-b border-border/50">
          <span className="text-muted-foreground">Contract</span>
          <div className="flex items-center gap-2">
            <code className="text-xs font-mono text-foreground">{contractAddress}</code>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6"
              onClick={() => window.open(`https://polygonscan.com/address/${contractAddress}`, '_blank')}
            >
              <ExternalLink className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* VIN Hash */}
        {vinHash && (
          <div className="flex items-center justify-between py-2 border-b border-border/50">
            <span className="text-muted-foreground">VIN Hash</span>
            <code className="text-xs font-mono text-foreground">{vinHash}</code>
          </div>
        )}

        {/* Mint Date */}
        {mintDate && (
          <div className="flex items-center justify-between py-2">
            <span className="text-muted-foreground">Minted</span>
            <span className="text-foreground">{mintDate}</span>
          </div>
        )}
      </div>

      <a 
        href="https://polygonscan.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 text-xs text-primary hover:text-primary/80 transition-colors pt-2"
      >
        View on PolygonScan
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
};

export default TokenInfo;
