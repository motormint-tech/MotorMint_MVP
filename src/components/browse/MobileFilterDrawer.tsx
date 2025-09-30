import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { categories, makes, years } from "@/data/listings";

interface MobileFilterDrawerProps {
  open: boolean;
  onClose: () => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedMakes: string[];
  onMakeChange: (makes: string[]) => void;
  selectedYears: number[];
  onYearChange: (years: number[]) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  onClearAll: () => void;
}

const MobileFilterDrawer = ({
  open,
  onClose,
  selectedCategory,
  onCategoryChange,
  selectedMakes,
  onMakeChange,
  selectedYears,
  onYearChange,
  priceRange,
  onPriceRangeChange,
  onClearAll,
}: MobileFilterDrawerProps) => {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[300px] bg-card border-border overflow-y-auto">
        <SheetHeader className="mb-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-foreground">Filters</SheetTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearAll}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          </div>
        </SheetHeader>

        {/* Category */}
        <div className="border-b border-border pb-4 mb-4">
          <h4 className="text-sm font-medium text-foreground mb-3">Category</h4>
          <div className="space-y-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-xs opacity-60">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Make */}
        <div className="border-b border-border pb-4 mb-4">
          <h4 className="text-sm font-medium text-foreground mb-3">Make</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {makes.map((make) => (
              <label
                key={make}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground cursor-pointer transition-colors"
              >
                <Checkbox
                  checked={selectedMakes.includes(make)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onMakeChange([...selectedMakes, make]);
                    } else {
                      onMakeChange(selectedMakes.filter(m => m !== make));
                    }
                  }}
                />
                <span>{make}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Year */}
        <div className="border-b border-border pb-4 mb-4">
          <h4 className="text-sm font-medium text-foreground mb-3">Year</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {years.map((year) => (
              <label
                key={year}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground cursor-pointer transition-colors"
              >
                <Checkbox
                  checked={selectedYears.includes(year)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onYearChange([...selectedYears, year]);
                    } else {
                      onYearChange(selectedYears.filter(y => y !== year));
                    }
                  }}
                />
                <span>{year}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="pb-4">
          <h4 className="text-sm font-medium text-foreground mb-3">Price Range</h4>
          <div className="space-y-4 px-1">
            <Slider
              value={priceRange}
              onValueChange={(value) => onPriceRangeChange(value as [number, number])}
              min={0}
              max={500000}
              step={5000}
              className="w-full"
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>${priceRange[0].toLocaleString()}</span>
              <span>${priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <Button 
          className="w-full mt-4" 
          onClick={onClose}
        >
          Apply Filters
        </Button>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilterDrawer;
