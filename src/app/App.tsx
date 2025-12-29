import { useState } from "react";
import { Header } from "./components/Header";
import { ProductCard, Product } from "./components/ProductCard";
import { Cart, CartItem } from "./components/Cart";
import { Checkout, ShippingInfo } from "./components/Checkout";
import { Payment } from "./components/Payment";
import { SellerLogin, SellerAccount } from "./components/SellerLogin";
import { SellerDashboard } from "./components/SellerDashboard";

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Rose Glow Serum",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1590393802688-ab3fd7c186f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwY29zbWV0aWNzJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjcwMTUxMDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Skincare",
    description: "Hydrating rose-infused serum for radiant skin"
  },
  {
    id: 2,
    name: "Pearl Earrings",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1658910452978-eb91cfee1609?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYWNjZXNzb3JpZXMlMjBqZXdlbHJ5fGVufDF8fHx8MTc2Njk3OTg1MXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Accessories",
    description: "Elegant pearl drop earrings for any occasion"
  },
  {
    id: 3,
    name: "Lavender Dreams Perfume",
    price: 125.00,
    image: "https://images.unsplash.com/photo-1747052881000-a640a4981dd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwYm90dGxlJTIwZWxlZ2FudHxlbnwxfHx8fDE3NjY5MjYwMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Fragrance",
    description: "Luxurious floral fragrance with lavender notes"
  },
  {
    id: 4,
    name: "Hydration Boost Cream",
    price: 38.50,
    image: "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHByb2R1Y3RzfGVufDF8fHx8MTc2NjkyNzk1MXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Skincare",
    description: "Deep moisturizing cream for all skin types"
  },
  {
    id: 5,
    name: "Designer Handbag",
    price: 299.00,
    image: "https://images.unsplash.com/photo-1630534592550-bc740a0c5704?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kYmFnJTIwcHVyc2UlMjBmYXNoaW9ufGVufDF8fHx8MTc2NjkxNjA5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Accessories",
    description: "Premium leather handbag with elegant design"
  },
  {
    id: 6,
    name: "Velvet Lipstick Set",
    price: 52.00,
    image: "https://images.unsplash.com/photo-1623882151192-5c6e32a99462?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtldXAlMjBiZWF1dHklMjBwcm9kdWN0fGVufDF8fHx8MTc2Njk4ODQwOHww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Makeup",
    description: "Collection of 5 beautiful matte lipstick shades"
  }
];

type View = "shop" | "checkout" | "payment";

export default function App() {
  // Product and cart state
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Checkout flow state
  const [currentView, setCurrentView] = useState<View>("shop");
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  
  // Seller state
  const [seller, setSeller] = useState<SellerAccount | null>(null);
  const [showSellerLogin, setShowSellerLogin] = useState(false);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setCurrentView("checkout");
  };

  const handleProceedToPayment = (info: ShippingInfo) => {
    setShippingInfo(info);
    setCurrentView("payment");
  };

  const handlePaymentComplete = () => {
    setCartItems([]);
    setShippingInfo(null);
    setCurrentView("shop");
  };

  const handleSellerLogin = (account: SellerAccount) => {
    setSeller(account);
    setShowSellerLogin(false);
  };

  const handleSellerLogout = () => {
    setSeller(null);
  };

  const handleAddProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const sellerProducts = products.filter(p => p.id > 1000); // Mock: seller's products have higher IDs

  // Seller Dashboard View
  if (seller) {
    return (
      <SellerDashboard
        seller={seller}
        onLogout={handleSellerLogout}
        onAddProduct={handleAddProduct}
        sellerProducts={sellerProducts}
      />
    );
  }

  // Checkout Flow Views
  if (currentView === "checkout") {
    return (
      <Checkout
        items={cartItems}
        onBack={() => {
          setCurrentView("shop");
          setIsCartOpen(true);
        }}
        onProceedToPayment={handleProceedToPayment}
      />
    );
  }

  if (currentView === "payment" && shippingInfo) {
    return (
      <Payment
        items={cartItems}
        shippingInfo={shippingInfo}
        onBack={() => setCurrentView("checkout")}
        onComplete={handlePaymentComplete}
      />
    );
  }

  // Main Shop View
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <Header
        cartItemsCount={totalItems}
        onCartClick={() => setIsCartOpen(true)}
        onSellerClick={() => setShowSellerLogin(true)}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text font-bold text-transparent">
            Featured Collection
          </h2>
          <p className="text-gray-600">Discover our carefully curated beauty and fashion essentials</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleProceedToCheckout}
      />

      {showSellerLogin && (
        <SellerLogin
          onLogin={handleSellerLogin}
          onClose={() => setShowSellerLogin(false)}
        />
      )}
    </div>
  );
}