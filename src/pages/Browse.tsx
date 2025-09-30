import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListingCard from "@/components/browse/ListingCard";
import FilterSidebar from "@/components/browse/FilterSidebar";
import ListingsHeader from "@/components/browse/ListingsHeader";
import ListingsList from "@/components/browse/ListingsList";
import MobileFilterDrawer from "@/components/browse/MobileFilterDrawer";
import { Input } from "@/components/ui/input";
import { listings as allListings } from "@/data/listings";

const Browse = () => {
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMakes, setSelectedMakes] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  
  // View states
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter and sort listings
  const filteredListings = useMemo(() => {
    let result = [...allListings];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (listing) =>
          listing.title.toLowerCase().includes(query) ||
          listing.make.toLowerCase().includes(query) ||
          listing.model.toLowerCase().includes(query) ||
          listing.location.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      if (selectedCategory === "available") {
        result = result.filter((listing) =>
          listing.tags.some((t) => t.name === "Available")
        );
      } else if (selectedCategory === "sold") {
        result = result.filter((listing) =>
          listing.tags.some((t) => t.name === "Sold")
        );
      } else if (selectedCategory === "street-cars") {
        result = result.filter((listing) =>
          listing.tags.some((t) => t.name === "Street Cars")
        );
      } else if (selectedCategory === "performance-trucks") {
        result = result.filter((listing) =>
          listing.tags.some((t) => t.name === "Performance Trucks")
        );
      }
    }

    // Make filter
    if (selectedMakes.length > 0) {
      result = result.filter((listing) => selectedMakes.includes(listing.make));
    }

    // Year filter
    if (selectedYears.length > 0) {
      result = result.filter((listing) => selectedYears.includes(listing.year));
    }

    // Price filter
    result = result.filter(
      (listing) =>
        listing.priceValue >= priceRange[0] && listing.priceValue <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime());
        break;
      case "price-low":
        result.sort((a, b) => a.priceValue - b.priceValue);
        break;
      case "price-high":
        result.sort((a, b) => b.priceValue - a.priceValue);
        break;
      case "hp-high":
        result.sort((a, b) => {
          const getHp = (hp: string) => parseInt(hp.replace(/\D/g, "")) || 0;
          return getHp(b.horsepower) - getHp(a.horsepower);
        });
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedMakes, selectedYears, priceRange, sortBy]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedMakes([]);
    setSelectedYears([]);
    setPriceRange([0, 500000]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20">
        {/* Page Header */}
        <div className="border-b border-border bg-card/50">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Browse Listings</h1>
                <p className="text-muted-foreground">
                  Find your next high-performance vehicle from our curated collection
                </p>
              </div>
              
              {/* Search Bar */}
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by make, model, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card border-border"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
              <FilterSidebar
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedMakes={selectedMakes}
                onMakeChange={setSelectedMakes}
                selectedYears={selectedYears}
                onYearChange={setSelectedYears}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                onClearAll={clearAllFilters}
              />
            </div>

            {/* Mobile Filter Drawer */}
            <MobileFilterDrawer
              open={mobileFiltersOpen}
              onClose={() => setMobileFiltersOpen(false)}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedMakes={selectedMakes}
              onMakeChange={setSelectedMakes}
              selectedYears={selectedYears}
              onYearChange={setSelectedYears}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              onClearAll={clearAllFilters}
            />

            {/* Listings Area */}
            <div className="flex-1">
              <ListingsHeader
                totalCount={filteredListings.length}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onToggleMobileFilters={() => setMobileFiltersOpen(true)}
              />

              {filteredListings.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">No vehicles found matching your criteria</p>
                  <button
                    onClick={clearAllFilters}
                    className="mt-4 text-primary hover:text-primary/80 transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredListings.map((listing) => (
                    <ListingCard
                      key={listing.id}
                      id={listing.id}
                      title={listing.title}
                      price={listing.price}
                      priceEth={listing.priceEth}
                      tokenId={listing.tokenId}
                      location={listing.location}
                      image={listing.image}
                      tags={listing.tags}
                    />
                  ))}
                </div>
              ) : (
                <ListingsList listings={filteredListings} />
              )}

              {/* Load More - for future pagination */}
              {filteredListings.length > 0 && (
                <div className="mt-12 text-center">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredListings.length} of {allListings.length} vehicles
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Browse;
