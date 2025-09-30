import { cn } from "@/lib/utils";

interface CryptoPriceProps {
  usdPrice: number;
  showUsd?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

// Mock ETH price for conversion (in reality would come from an API)
const ETH_PRICE_USD = 3450;
const MATIC_PRICE_USD = 0.85;

const CryptoPrice = ({ usdPrice, showUsd = true, size = 'md', className }: CryptoPriceProps) => {
  const ethPrice = (usdPrice / ETH_PRICE_USD).toFixed(4);
  const maticPrice = (usdPrice / MATIC_PRICE_USD).toFixed(2);

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-4xl',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };

  return (
    <div className={cn("space-y-1", className)}>
      {/* Primary ETH Price */}
      <div className={cn("flex items-center gap-2 font-bold text-foreground", sizeClasses[size])}>
        <svg className={iconSizes[size]} viewBox="0 0 320 512" fill="currentColor">
          <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" />
        </svg>
        <span>{ethPrice} ETH</span>
      </div>

      {/* Secondary MATIC Price */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <svg className="w-4 h-4 text-violet-400" viewBox="0 0 38 33" fill="currentColor">
          <path d="M29 10.2c-.7-.4-1.6-.4-2.4 0L21 13.5l-3.8 2.1-5.5 3.3c-.7.4-1.6.4-2.4 0l-4.3-2.6c-.7-.4-1.2-1.2-1.2-2.1v-5c0-.8.4-1.6 1.2-2.1l4.3-2.5c.7-.4 1.6-.4 2.4 0l4.3 2.6c.7.4 1.2 1.2 1.2 2.1v3.3l3.8-2.2V7c0-.8-.4-1.6-1.2-2.1l-8-4.7c-.7-.4-1.6-.4-2.4 0L1.2 5C.4 5.4 0 6.2 0 7v9.4c0 .8.4 1.6 1.2 2.1l8.1 4.7c.7.4 1.6.4 2.4 0l5.5-3.2 3.8-2.2 5.5-3.2c.7-.4 1.6-.4 2.4 0l4.3 2.5c.7.4 1.2 1.2 1.2 2.1v5c0 .8-.4 1.6-1.2 2.1L29 28.8c-.7.4-1.6.4-2.4 0l-4.3-2.5c-.7-.4-1.2-1.2-1.2-2.1v-3.2l-3.8 2.2v3.3c0 .8.4 1.6 1.2 2.1l8.1 4.7c.7.4 1.6.4 2.4 0l8.1-4.7c.7-.4 1.2-1.2 1.2-2.1V17c0-.8-.4-1.6-1.2-2.1L29 10.2z" />
        </svg>
        <span>{Number(maticPrice).toLocaleString()} MATIC</span>
      </div>

      {/* USD Reference */}
      {showUsd && (
        <p className="text-xs text-muted-foreground">
          ≈ ${usdPrice.toLocaleString()} USD
        </p>
      )}
    </div>
  );
};

export default CryptoPrice;
