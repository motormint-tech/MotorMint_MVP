import { Link } from "react-router-dom";
import Web3Badge from "@/components/Web3Badge";
import { ExternalLink } from "lucide-react";

interface ListingCardProps {
  id: string;
  title: string;
  price: string;
  priceEth?: string;
  tokenId?: string;
  location: string;
  image: string;
  tags: { name: string; type: "category" | "status" }[];
}

const ListingCard = ({ id, title, price, priceEth, tokenId, location, image, tags }: ListingCardProps) => {
  const statusTag = tags.find(t => t.type === "status");
  const categoryTags = tags.filter(t => t.type === "category");

  return (
    <Link 
      to={`/listing/${id}`}
      className="group block card-hover"
    >
      <div className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Token ID Badge */}
          {tokenId && (
            <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-mono font-bold text-primary flex items-center gap-1">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              {tokenId}
            </div>
          )}

          {/* On-Chain Verified Badge */}
          <div className="absolute top-3 left-3">
            <Web3Badge variant="verified" size="sm" />
          </div>
          
          {/* Status Badge */}
          {statusTag && (
            <div className={`absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
              statusTag.name === "Available"
                ? "bg-tag-available text-white"
                : "bg-tag-sold text-white"
            }`}>
              {statusTag.name === "Available" ? "Available" : "Transferred"}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 min-h-[2.5rem]">
            {title}
          </h3>
          
          {/* Crypto Price */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-foreground" viewBox="0 0 320 512" fill="currentColor">
                <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" />
              </svg>
              <span className="text-lg font-bold text-foreground">{priceEth || '0.0000'} ETH</span>
            </div>
            <p className="text-xs text-muted-foreground">≈ {price} USD • {location}</p>
          </div>

          {/* Category Tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            {categoryTags.map((tag) => (
              <span
                key={tag.name}
                className="text-xs px-2.5 py-1 rounded-full font-medium bg-secondary text-secondary-foreground"
              >
                #{tag.name.replace(/\s+/g, '')}
              </span>
            ))}
            <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-violet-500/20 text-violet-400">
              #Polygon
            </span>
          </div>

          {/* View on Explorer Link */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <span className="text-xs text-muted-foreground">Tokenized Asset</span>
            <span className="text-xs text-primary flex items-center gap-1">
              View on-chain
              <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
