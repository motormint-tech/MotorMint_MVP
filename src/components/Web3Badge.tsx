import { Shield, Link as LinkIcon, Coins } from "lucide-react";
import { cn } from "@/lib/utils";

interface Web3BadgeProps {
  variant?: 'verified' | 'onchain' | 'tokenized' | 'network';
  network?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Web3Badge = ({ variant = 'verified', network, className, size = 'sm' }: Web3BadgeProps) => {
  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  if (variant === 'verified') {
    return (
      <span className={cn(
        "inline-flex items-center font-semibold uppercase tracking-wider rounded-full",
        "bg-primary/20 text-primary border border-primary/30",
        sizeClasses[size],
        className
      )}>
        <Shield className={iconSizes[size]} />
        On-Chain Verified
      </span>
    );
  }

  if (variant === 'onchain') {
    return (
      <span className={cn(
        "inline-flex items-center font-semibold uppercase tracking-wider rounded-full",
        "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
        sizeClasses[size],
        className
      )}>
        <LinkIcon className={iconSizes[size]} />
        Blockchain Record
      </span>
    );
  }

  if (variant === 'tokenized') {
    return (
      <span className={cn(
        "inline-flex items-center font-semibold uppercase tracking-wider rounded-full",
        "bg-amber-500/20 text-amber-400 border border-amber-500/30",
        sizeClasses[size],
        className
      )}>
        <Coins className={iconSizes[size]} />
        Tokenized Asset
      </span>
    );
  }

  if (variant === 'network') {
    return (
      <span className={cn(
        "inline-flex items-center font-medium rounded-full",
        "bg-violet-500/20 text-violet-400 border border-violet-500/30",
        sizeClasses[size],
        className
      )}>
        <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
        {network || 'Polygon'}
      </span>
    );
  }

  return null;
};

export default Web3Badge;
