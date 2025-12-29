import { useState } from "react";
import { Store, Lock, Mail, User, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface SellerLoginProps {
  onLogin: (seller: SellerAccount) => void;
  onClose: () => void;
}

export interface SellerAccount {
  id: string;
  name: string;
  email: string;
  storeName: string;
}

export function SellerLogin({ onLogin, onClose }: SellerLoginProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    storeName: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login/register - in real app, this would call an API
    const seller: SellerAccount = {
      id: Date.now().toString(),
      name: formData.name || "Seller",
      email: formData.email,
      storeName: formData.storeName || "My Store",
    };
    
    onLogin(seller);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border border-pink-100 bg-white p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 transition-colors hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-purple-400">
              <Store className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mb-2 font-bold text-gray-800">
            {isRegister ? "Become a Seller" : "Seller Login"}
          </h2>
          <p className="text-sm text-gray-600">
            {isRegister
              ? "Create your account to start selling"
              : "Access your seller dashboard"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-pink-200 pl-10 focus:border-pink-400"
                  />
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div>
                <Label htmlFor="storeName">Store Name</Label>
                <div className="relative">
                  <Input
                    id="storeName"
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleChange}
                    required
                    className="border-pink-200 pl-10 focus:border-pink-400"
                  />
                  <Store className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </>
          )}

          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border-pink-200 pl-10 focus:border-pink-400"
              />
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="border-pink-200 pl-10 focus:border-pink-400"
              />
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          >
            {isRegister ? "Create Account" : "Login"}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-pink-600 hover:underline"
          >
            {isRegister
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </>
  );
}
