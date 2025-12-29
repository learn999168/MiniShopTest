import { ShoppingBag, Heart, Store } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onSellerClick: () => void;
}

export function Header({ cartItemsCount, onCartClick, onSellerClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-300 to-purple-300">
              <Heart className="h-5 w-5 fill-white text-white" />
            </div>
            <div>
              <h1 className="font-bold text-pink-600">Pretty Shop</h1>
              <p className="text-xs text-gray-500">Your beauty destination</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={onSellerClick}
              variant="outline"
              className="border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              <Store className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Sell</span>
            </Button>
            <Button
              onClick={onCartClick}
              variant="outline"
              className="relative border-pink-200 hover:bg-pink-50"
            >
              <ShoppingBag className="h-5 w-5 text-pink-600" />
              {cartItemsCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs text-white">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}