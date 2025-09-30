import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";
import { getSoldListings } from "@/data/listings";
import { Button } from "@/components/ui/button";

const RecentTransactions = () => {
  const soldVehicles = getSoldListings().slice(0, 4);

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Recent On-Chain Transactions</h2>
            <p className="text-muted-foreground">Verified ownership transfers on the blockchain</p>
          </div>
          <Button variant="ghost" className="gap-2 text-primary">
            View All Transactions
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>

        {/* Transaction List */}
        <div className="space-y-4">
          {soldVehicles.map((vehicle, index) => (
            <Link
              key={vehicle.id}
              to={`/listing/${vehicle.id}`}
              className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-all"
            >
              {/* Image */}
              <img
                src={vehicle.image}
                alt={vehicle.title}
                className="w-16 h-16 rounded-lg object-cover"
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground truncate">{vehicle.title}</h4>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                  <span className="font-mono">Token: {vehicle.tokenId}</span>
                  <span>•</span>
                  <span>Transferred {vehicle.ownershipHistory[vehicle.ownershipHistory.length - 1]?.date}</span>
                </div>
              </div>

              {/* Price */}
              <div className="text-right">
                <div className="flex items-center gap-1 justify-end">
                  <svg className="w-4 h-4" viewBox="0 0 320 512" fill="currentColor">
                    <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" />
                  </svg>
                  <span className="font-bold">{vehicle.priceEth} ETH</span>
                </div>
                <span className="text-xs text-muted-foreground">{vehicle.price}</span>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">
                  Transferred
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-8">
          <a 
            href="https://polygonscan.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            View all transactions on PolygonScan
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default RecentTransactions;
