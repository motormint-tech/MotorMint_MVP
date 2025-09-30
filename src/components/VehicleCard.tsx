import { Link } from "react-router-dom";

interface VehicleCardProps {
  id: string;
  title: string;
  price: string;
  location: string;
  image: string;
  tags: { name: string; type: "category" | "status" }[];
}

const VehicleCard = ({ id, title, price, location, image, tags }: VehicleCardProps) => {
  return (
    <Link 
      to={`/listing/${id}`}
      className="group block card-hover"
    >
      <div className="bg-card rounded-xl overflow-hidden border border-border">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Watermark */}
          <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-foreground">
            STREET CAR MARKET
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {title}
          </h3>
          
          <div className="text-sm">
            <span className="text-foreground font-medium">{price}</span>
            <span className="text-muted-foreground"> - {location}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag.name}
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  tag.type === "status" && tag.name === "Available"
                    ? "bg-tag-available/20 text-tag-available"
                    : tag.type === "status" && tag.name === "Sold"
                    ? "bg-tag-sold/20 text-tag-sold"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VehicleCard;
