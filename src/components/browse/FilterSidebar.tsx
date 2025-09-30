import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { categories, makes, years } from "@/data/listings";

interface FilterSidebarProps {
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

const FilterSidebar = ({
  selectedCategory,
  onCategoryChange,
  selectedMakes,
  onMakeChange,
  selectedYears,
  onYearChange,
  priceRange,
  onPriceRangeChange,
  onClearAll,
}: FilterSidebarProps) => {
  const [openSections, setOpenSections] = useState({
    category: true,
    make: true,
    year: false,
    price: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const hasActiveFilters = selectedCategory !== "all" || 
    selectedMakes.length > 0 || 
    selectedYears.length > 0 ||
    priceRange[0] > 0 || priceRange[1] < 500000;

  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="bg-card rounded-xl border border-border p-5 sticky top-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-foreground">Filters</h3>
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearAll}
              className="text-xs text-muted-foreground hover:text-foreground h-auto py-1 px-2"
            >
              <X className="w-3 h-3 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        {/* Category Section */}
        <div className="border-b border-border pb-4 mb-4">
          <button
            onClick={() => toggleSection("category")}
            className="flex items-center justify-between w-full text-sm font-medium text-foreground mb-3"
          >
            Category
            {openSections.category ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {openSections.category && (
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
          )}
        </div>

        {/* Make Section */}
        <div className="border-b border-border pb-4 mb-4">
          <button
            onClick={() => toggleSection("make")}
            className="flex items-center justify-between w-full text-sm font-medium text-foreground mb-3"
          >
            Make
            {openSections.make ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {openSections.make && (
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
          )}
        </div>

        {/* Year Section */}
        <div className="border-b border-border pb-4 mb-4">
          <button
            onClick={() => toggleSection("year")}
            className="flex items-center justify-between w-full text-sm font-medium text-foreground mb-3"
          >
            Year
            {openSections.year ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {openSections.year && (
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
          )}
        </div>

        {/* Price Section */}
        <div>
          <button
            onClick={() => toggleSection("price")}
            className="flex items-center justify-between w-full text-sm font-medium text-foreground mb-3"
          >
            Price Range
            {openSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {openSections.price && (
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
          )}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
