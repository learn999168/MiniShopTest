import { X, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { Product } from "./ProductCard";

export interface CartItem extends Product {
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
}

export function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-2xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="border-b border-pink-100 bg-gradient-to-r from-pink-50 to-purple-50 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-pink-600" />
                <h2 className="font-bold text-gray-800">Shopping Cart</h2>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-pink-100"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <p className="mt-1 text-sm text-gray-500">{items.length} items</p>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-pink-50">
                  <ShoppingBag className="h-10 w-10 text-pink-300" />
                </div>
                <p className="text-gray-500">Your cart is empty</p>
                <p className="mt-1 text-sm text-gray-400">Add some beautiful items!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-lg border border-pink-100 bg-gradient-to-br from-white to-pink-50/30 p-3 transition-all hover:shadow-md"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-pink-600">${item.price.toFixed(2)}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          size="sm"
                          variant="outline"
                          className="h-7 w-7 border-pink-200 p-0 hover:bg-pink-50"
                        >
                          -
                        </Button>
                        <span className="text-sm font-medium">{item.quantity}</span>
                        <Button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          size="sm"
                          variant="outline"
                          className="h-7 w-7 border-pink-200 p-0 hover:bg-pink-50"
                        >
                          +
                        </Button>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="ml-auto text-gray-400 transition-colors hover:text-pink-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-pink-100 bg-gradient-to-r from-pink-50 to-purple-50 p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-semibold text-gray-800">Total</span>
                <span className="font-bold text-pink-600">${total.toFixed(2)}</span>
              </div>
              <Button
                onClick={onCheckout}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              >
                Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}