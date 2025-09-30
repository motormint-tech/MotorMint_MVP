import { Link } from "react-router-dom";
import { MapPin, ExternalLink } from "lucide-react";
import { Listing } from "@/data/listings";
import Web3Badge from "@/components/Web3Badge";

interface ListingsListProps {
  listings: Listing[];
}

const ListingsList = ({ listings }: ListingsListProps) => {
  return (
    <div className="space-y-4">
      {listings.map((listing) => {
        const statusTag = listing.tags.find(t => t.type === "status");
        const categoryTags = listing.tags.filter(t => t.type === "category");

        return (
          <Link
            key={listing.id}
            to={`/listing/${listing.id}`}
            className="group flex flex-col sm:flex-row gap-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-all duration-300 overflow-hidden card-hover"
          >
            {/* Image */}
            <div className="relative w-full sm:w-64 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Token ID */}
              <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-mono font-bold text-primary">
                {listing.tokenId}
              </div>

              {statusTag && (
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                  statusTag.name === "Available"
                    ? "bg-tag-available text-white"
                    : "bg-tag-sold text-white"
                }`}>
                  {statusTag.name === "Available" ? "Available" : "Transferred"}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 p-4 sm:py-4 sm:pr-4 sm:pl-0 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {listing.title}
                  </h3>
                  <Web3Badge variant="verified" size="sm" />
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {listing.location}
                  </span>
                  <span className="text-primary font-semibold">{listing.horsepower}</span>
                  <Web3Badge variant="network" network={listing.network} size="sm" />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {categoryTags.map((tag) => (
                    <span
                      key={tag.name}
                      className="text-xs px-2.5 py-1 rounded-full font-medium bg-secondary text-secondary-foreground"
                    >
                      #{tag.name.replace(/\s+/g, '')}
                    </span>
                  ))}
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-primary/20 text-primary">
                    #Tokenized
                  </span>
                </div>
              </div>

              {/* Price & Blockchain Info */}
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-foreground" viewBox="0 0 320 512" fill="currentColor">
                      <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" />
                    </svg>
                    <span className="text-xl font-bold text-foreground">{listing.priceEth} ETH</span>
                  </div>
                  <p className="text-xs text-muted-foreground">≈ {listing.price} USD</p>
                </div>
                
                <span className="text-xs text-primary flex items-center gap-1 hover:underline">
                  View on PolygonScan
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ListingsList;
