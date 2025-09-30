import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Web3Badge from "@/components/Web3Badge";
import CryptoPrice from "@/components/CryptoPrice";
import TokenInfo from "@/components/TokenInfo";
import EscrowFlow from "@/components/EscrowFlow";
import OwnershipTimeline from "@/components/OwnershipTimeline";
import { 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Calendar, 
  Gauge, 
  Settings, 
  Share2, 
  Heart,
  Check,
  ArrowLeft,
  ZoomIn,
  Shield,
  Wallet,
  ExternalLink
} from "lucide-react";
import { listings, type Listing } from "@/data/listings";
import { listingDetails, type ListingDetail as ListingDetailType } from "@/data/listingDetails";

// Supra images for the featured listing
import supraFront from "@/assets/supra/supra-front.jpg";
import supraRear from "@/assets/supra/supra-rear.jpg";
import supraInterior from "@/assets/supra/supra-interior.jpg";
import supraDoors from "@/assets/supra/supra-doors.jpg";
import supraEngineHead from "@/assets/supra/supra-engine-head.jpg";
import supraEngine from "@/assets/supra/supra-engine.jpg";
import supraSide from "@/assets/supra/supra-side.jpg";
import supraQuarter from "@/assets/supra/supra-quarter.jpg";
import supraFrontAction from "@/assets/supra/supra-front-action.jpg";
import supraWheel from "@/assets/supra/supra-wheel.jpg";

const supraImages = [
  supraFront,
  supraRear,
  supraSide,
  supraQuarter,
  supraFrontAction,
  supraInterior,
  supraDoors,
  supraEngine,
  supraEngineHead,
  supraWheel,
];

const ListingDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const listing = listings.find((l) => l.id === id);
  const details = listingDetails[id || ""] || listingDetails["3"];

  if (!listing) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 pt-32 pb-20 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Asset Not Found</h1>
          <p className="text-muted-foreground mb-8">This tokenized vehicle doesn't exist on the blockchain.</p>
          <Link to="/listings">
            <Button>Browse Marketplace</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = id === "3" ? supraImages : [listing.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const statusTag = listing.tags.find((t) => t.type === "status");
  const isAvailable = statusTag?.name === "Available";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Link to="/listings" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" />
                Back to Marketplace
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground">{listing.title}</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Web3Badge variant="verified" size="md" />
              <Web3Badge variant="network" network={listing.network} size="md" />
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="container mx-auto px-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Main Image */}
            <div className="lg:col-span-3 relative group">
              <div 
                className="aspect-[16/10] rounded-xl overflow-hidden bg-card cursor-pointer"
                onClick={() => setIsLightboxOpen(true)}
              >
                <img
                  src={images[currentImageIndex]}
                  alt={listing.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                
                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium">
                  {currentImageIndex + 1} / {images.length}
                </div>

                {/* Token ID Badge */}
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    <span className="text-xs font-mono font-bold text-primary">{listing.tokenId}</span>
                  </div>
                </div>

                {/* Zoom Icon */}
                <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-5 h-5 text-foreground" />
                </div>
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="lg:col-span-1 grid grid-cols-4 lg:grid-cols-2 gap-2">
              {images.slice(0, 6).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageIndex === index 
                      ? "border-primary glow-cyan" 
                      : "border-transparent hover:border-primary/50"
                  }`}
                >
                  <img
                    src={img}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
              {images.length > 6 && (
                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="aspect-square rounded-lg overflow-hidden bg-card border-2 border-transparent hover:border-primary/50 flex items-center justify-center transition-all"
                >
                  <span className="text-primary font-bold">+{images.length - 6}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Web3Badge variant="tokenized" size="md" />
                  {listing.tags.map((tag) => (
                    <Badge
                      key={tag.name}
                      className={`${
                        tag.type === "status" && tag.name === "Available"
                          ? "bg-[hsl(var(--tag-available))]/20 text-[hsl(var(--tag-available))] hover:bg-[hsl(var(--tag-available))]/30"
                          : tag.type === "status" && tag.name === "Sold"
                          ? "bg-[hsl(var(--tag-sold))]/20 text-[hsl(var(--tag-sold))] hover:bg-[hsl(var(--tag-sold))]/30"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      #{tag.name}
                    </Badge>
                  ))}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  {listing.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {listing.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {listing.year}
                  </span>
                  <span className="flex items-center gap-2">
                    <Gauge className="w-4 h-4" />
                    {listing.horsepower}
                  </span>
                </div>
              </div>

              {/* Quick Specs with On-Chain Data */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Make", value: listing.make },
                  { label: "Model", value: listing.model },
                  { label: "Year", value: listing.year.toString() },
                  { label: "Power", value: listing.horsepower },
                ].map((spec) => (
                  <div key={spec.label} className="bg-card rounded-xl p-4 border border-border">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{spec.label}</p>
                    <p className="text-lg font-bold text-foreground">{spec.value}</p>
                  </div>
                ))}
              </div>

              {/* On-Chain Token Info */}
              <TokenInfo 
                tokenId={listing.tokenId}
                contractAddress={listing.contractAddress}
                network={listing.network}
                mintDate={listing.mintDate}
                vinHash={listing.vinHash}
              />

              {/* Description */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">About This Tokenized Asset</h2>
                <div className="bg-card rounded-xl p-6 border border-border">
                  <p className="text-muted-foreground leading-relaxed">
                    {details.description}
                  </p>
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="text-sm text-primary">VIN verified on-chain</span>
                  </div>
                </div>
              </div>

              {/* Specifications */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">Technical Specifications</h2>
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                    <div className="divide-y divide-border">
                      {details.specs.slice(0, Math.ceil(details.specs.length / 2)).map((spec) => (
                        <div key={spec.label} className="flex justify-between p-4">
                          <span className="text-muted-foreground">{spec.label}</span>
                          <span className="font-medium text-foreground">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="divide-y divide-border">
                      {details.specs.slice(Math.ceil(details.specs.length / 2)).map((spec) => (
                        <div key={spec.label} className="flex justify-between p-4">
                          <span className="text-muted-foreground">{spec.label}</span>
                          <span className="font-medium text-foreground">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modifications */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">Build & Modifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {details.modifications.map((mod) => (
                    <div key={mod.category} className="bg-card rounded-xl p-5 border border-border">
                      <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        {mod.category}
                      </h3>
                      <ul className="space-y-2">
                        {mod.items.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">Features & Highlights</h2>
                <div className="bg-card rounded-xl p-6 border border-border">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {details.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Ownership Timeline */}
              <OwnershipTimeline events={listing.ownershipHistory} />
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Price Card */}
                <div className="bg-card rounded-xl p-6 border border-primary/20">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Token Price</p>
                      <CryptoPrice usdPrice={listing.priceValue} size="xl" />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge className={`${isAvailable ? "bg-[hsl(var(--tag-available))]/20 text-[hsl(var(--tag-available))]" : "bg-[hsl(var(--tag-sold))]/20 text-[hsl(var(--tag-sold))]"}`}>
                        {isAvailable ? "Available" : "Ownership Transferred"}
                      </Badge>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="ghost" size="sm" className="flex-1 gap-2">
                        <Heart className="w-4 h-4" />
                        Watchlist
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1 gap-2">
                        <Share2 className="w-4 h-4" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Escrow Purchase Flow */}
                {isAvailable && (
                  <div className="bg-card rounded-xl p-6 border border-border">
                    <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                      <Wallet className="w-5 h-5 text-primary" />
                      Purchase via Smart Contract
                    </h3>
                    <EscrowFlow 
                      vehicleTitle={listing.title}
                      priceEth={listing.priceEth}
                      tokenId={listing.tokenId}
                    />
                  </div>
                )}

                {/* Seller Info - Web3 Style */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="font-bold text-foreground mb-4">Current Owner</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center">
                        <Wallet className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{details.seller.name}</p>
                        <p className="text-sm text-muted-foreground font-mono">0x742d...B6a9</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm py-2 border-t border-border">
                      <span className="text-muted-foreground">Vehicles Sold</span>
                      <span className="font-medium">{details.seller.listingsCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">On MotorMint Since</span>
                      <span className="font-medium">{details.seller.memberSince}</span>
                    </div>

                    <a 
                      href="https://polygonscan.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 text-xs text-primary hover:underline pt-2"
                    >
                      View Seller's Wallet
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Trust & Security */}
                <div className="bg-gradient-to-br from-primary/10 to-violet-500/10 rounded-xl p-5 border border-primary/20">
                  <h4 className="font-medium text-foreground mb-3 text-sm flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    On-Chain Security
                  </h4>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-primary" />
                      VIN verified & hashed on-chain
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-primary" />
                      Smart contract escrow protection
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-primary" />
                      Immutable ownership history
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-primary" />
                      Automatic ownership transfer
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-card flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
          >
            ✕
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <img
            src={images[currentImageIndex]}
            alt={listing.title}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Thumbnails */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto pb-2">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                className={`w-16 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  currentImageIndex === index ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ListingDetailPage;
