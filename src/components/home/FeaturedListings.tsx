import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Web3Badge from "@/components/Web3Badge";
import { getFeaturedListings } from "@/data/listings";

const FeaturedListings = () => {
  const featuredVehicles = getFeaturedListings().slice(0, 6);

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Featured Tokenized Assets</h2>
            <p className="text-muted-foreground">On-chain verified vehicles ready for ownership transfer</p>
          </div>
          <Link to="/listings">
            <Button variant="outline" className="rounded-full gap-2">
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVehicles.map((vehicle) => (
            <Link
              key={vehicle.id}
              to={`/listing/${vehicle.id}`}
              className="group block"
            >
              <div className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Web3Badge variant="verified" size="sm" />
                  </div>
                  <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-mono font-bold text-primary">
                    {vehicle.tokenId}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                    Available
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {vehicle.title}
                  </h3>
                  
                  {/* Crypto Price */}
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-foreground" viewBox="0 0 320 512" fill="currentColor">
                      <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" />
                    </svg>
                    <span className="text-lg font-bold">{vehicle.priceEth} ETH</span>
                    <span className="text-xs text-muted-foreground">≈ {vehicle.price}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-xs text-muted-foreground">{vehicle.location}</span>
                    <span className="text-xs text-primary flex items-center gap-1">
                      View on-chain
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
