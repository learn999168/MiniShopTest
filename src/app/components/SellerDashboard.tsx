import { useState } from "react";
import { Plus, Edit, Trash2, LogOut, Package, DollarSign, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { SellerAccount } from "./SellerLogin";
import { Product } from "./ProductCard";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface SellerDashboardProps {
  seller: SellerAccount;
  onLogout: () => void;
  onAddProduct: (product: Product) => void;
  sellerProducts: Product[];
}

export function SellerDashboard({ seller, onLogout, onAddProduct, sellerProducts }: SellerDashboardProps) {
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    imageUrl: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct: Product = {
      id: Date.now(),
      name: productForm.name,
      price: parseFloat(productForm.price),
      category: productForm.category,
      description: productForm.description,
      image: productForm.imageUrl || "https://images.unsplash.com/photo-1590393802688-ab3fd7c186f2?w=400",
    };
    
    onAddProduct(newProduct);
    setProductForm({
      name: "",
      price: "",
      category: "",
      description: "",
      imageUrl: "",
    });
    setIsAddingProduct(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProductForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const totalRevenue = sellerProducts.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b border-pink-100 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-gray-800">{seller.storeName}</h1>
              <p className="text-sm text-gray-500">Seller Dashboard</p>
            </div>
            <Button
              onClick={onLogout}
              variant="outline"
              className="border-pink-200 text-pink-600 hover:bg-pink-50"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-pink-100 bg-white p-6 shadow-lg">
            <div className="mb-2 flex items-center gap-2 text-pink-600">
              <Package className="h-5 w-5" />
              <span className="text-sm">Products</span>
            </div>
            <p className="font-bold text-gray-800">{sellerProducts.length}</p>
          </div>
          
          <div className="rounded-lg border border-pink-100 bg-white p-6 shadow-lg">
            <div className="mb-2 flex items-center gap-2 text-purple-600">
              <DollarSign className="h-5 w-5" />
              <span className="text-sm">Total Value</span>
            </div>
            <p className="font-bold text-gray-800">${totalRevenue.toFixed(2)}</p>
          </div>
          
          <div className="rounded-lg border border-pink-100 bg-white p-6 shadow-lg">
            <div className="mb-2 flex items-center gap-2 text-pink-600">
              <ShoppingBag className="h-5 w-5" />
              <span className="text-sm">Sales</span>
            </div>
            <p className="font-bold text-gray-800">0</p>
          </div>
        </div>

        {/* Add Product Button */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-bold text-gray-800">My Products</h2>
          <Button
            onClick={() => setIsAddingProduct(!isAddingProduct)}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>

        {/* Add Product Form */}
        {isAddingProduct && (
          <div className="mb-6 rounded-lg border border-pink-100 bg-white p-6 shadow-lg">
            <h3 className="mb-4 font-bold text-gray-800">Add New Product</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={productForm.name}
                    onChange={handleChange}
                    required
                    className="border-pink-200 focus:border-pink-400"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={productForm.price}
                    onChange={handleChange}
                    required
                    className="border-pink-200 focus:border-pink-400"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  value={productForm.category}
                  onChange={handleChange}
                  required
                  className="border-pink-200 focus:border-pink-400"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  name="description"
                  value={productForm.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="flex w-full rounded-md border border-pink-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
                />
              </div>

              <div>
                <Label htmlFor="imageUrl">Image URL (optional)</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  value={productForm.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="border-pink-200 focus:border-pink-400"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                >
                  Add Product
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddingProduct(false)}
                  className="border-pink-200"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Products List */}
        {sellerProducts.length === 0 ? (
          <div className="rounded-lg border border-pink-100 bg-white p-12 text-center shadow-lg">
            <Package className="mx-auto mb-4 h-12 w-12 text-pink-300" />
            <p className="text-gray-500">No products yet</p>
            <p className="text-sm text-gray-400">Click "Add Product" to get started</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sellerProducts.map((product) => (
              <div
                key={product.id}
                className="rounded-lg border border-pink-100 bg-white p-4 shadow-lg"
              >
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="mb-3 h-40 w-full rounded-lg object-cover"
                />
                <h3 className="mb-1 font-semibold text-gray-800">{product.name}</h3>
                <p className="mb-2 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-pink-600">${product.price.toFixed(2)}</span>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-pink-600">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
