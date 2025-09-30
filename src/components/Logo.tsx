import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
}

const Logo = ({ className = "", showTagline = true }: LogoProps) => {
  return (
    <Link to="/" className={`flex items-center gap-3 group ${className}`}>
      {/* Logo Icon - Stylized M with mint leaf accent */}
      <div className="relative">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:scale-105"
        >
          {/* Background circle */}
          <circle
            cx="20"
            cy="20"
            r="19"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            fill="none"
            className="opacity-80"
          />
          
          {/* Stylized M */}
          <path
            d="M10 28V14L16 22L20 16L24 22L30 14V28"
            stroke="hsl(var(--foreground))"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          
          {/* Mint leaf accent */}
          <path
            d="M30 10C30 10 32 8 34 10C32 12 30 10 30 10Z"
            fill="hsl(var(--primary))"
            className="animate-pulse"
          />
          <path
            d="M31 11C31 11 33 13 31 15"
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Text */}
      <div className="flex flex-col leading-none">
        {showTagline && (
          <span className="text-[10px] tracking-[0.25em] text-muted-foreground font-medium uppercase">
            Blockchain Powered
          </span>
        )}
        <span className="text-xl font-bold tracking-tight text-foreground">
          MOTOR<span className="text-primary">MINT</span>
        </span>
      </div>
    </Link>
  );
};

export default Logo;
