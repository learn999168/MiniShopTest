import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useState } from "react";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(product);
    setTimeout(() => setIsAdding(false), 600);
  };

  return (
    <Card className="group relative overflow-hidden border-pink-100 transition-all hover:shadow-lg hover:shadow-pink-200/50">
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-all hover:bg-white"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isFavorite ? "fill-pink-500 text-pink-500" : "text-gray-400"
            }`}
          />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/20 to-transparent p-2">
          <span className="inline-block rounded-full bg-white/90 px-2 py-1 text-xs text-pink-600">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="mb-1 font-semibold text-gray-800">{product.name}</h3>
        <p className="mb-3 text-sm text-gray-500 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="font-bold text-pink-600">${product.price.toFixed(2)}</span>
          <Button
            onClick={handleAddToCart}
            size="sm"
            className={`bg-gradient-to-r from-pink-400 to-purple-400 transition-all hover:from-pink-500 hover:to-purple-500 ${
              isAdding ? "scale-95" : ""
            }`}
          >
            <ShoppingCart className="mr-1 h-4 w-4" />
            {isAdding ? "Added!" : "Add"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
