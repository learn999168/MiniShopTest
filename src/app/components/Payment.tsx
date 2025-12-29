import { useState } from "react";
import { ArrowLeft, CreditCard, Lock, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ShippingInfo } from "./Checkout";
import { CartItem } from "./Cart";

interface PaymentProps {
  items: CartItem[];
  shippingInfo: ShippingInfo;
  onBack: () => void;
  onComplete: () => void;
}

export function Payment({ items, shippingInfo, onBack, onComplete }: PaymentProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      
      // Wait a bit then call onComplete
      setTimeout(() => {
        onComplete();
      }, 2000);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Format card number
    if (e.target.name === "cardNumber") {
      value = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
      if (value.length > 19) return;
    }
    
    // Format expiry date
    if (e.target.name === "expiryDate") {
      value = value.replace(/\D/g, "");
      if (value.length >= 2) {
        value = value.slice(0, 2) + "/" + value.slice(2, 4);
      }
      if (value.length > 5) return;
    }
    
    // Limit CVV
    if (e.target.name === "cvv" && value.length > 4) return;
    
    setPaymentData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  if (isComplete) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="w-full max-w-md rounded-lg border border-pink-100 bg-white p-8 text-center shadow-lg">
          <div className="mb-4 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-100 to-purple-100">
              <CheckCircle className="h-10 w-10 text-pink-600" />
            </div>
          </div>
          <h2 className="mb-2 font-bold text-gray-800">Payment Successful!</h2>
          <p className="mb-6 text-gray-600">Thank you for your order</p>
          <div className="rounded-lg bg-gradient-to-br from-pink-50 to-purple-50 p-4">
            <p className="text-sm text-gray-700">
              Order confirmation has been sent to
            </p>
            <p className="font-medium text-pink-600">{shippingInfo.email}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-6 text-pink-600 hover:bg-pink-50"
          disabled={isProcessing}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shipping
        </Button>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-pink-100 bg-white p-6 shadow-lg">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-bold text-gray-800">Payment Details</h2>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Lock className="h-4 w-4" />
                  <span>Secure Payment</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      value={paymentData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      required
                      className="border-pink-200 pr-10 focus:border-pink-400"
                      disabled={isProcessing}
                    />
                    <CreditCard className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    name="cardName"
                    value={paymentData.cardName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="border-pink-200 focus:border-pink-400"
                    disabled={isProcessing}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      value={paymentData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      required
                      className="border-pink-200 focus:border-pink-400"
                      disabled={isProcessing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      type="password"
                      value={paymentData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      required
                      className="border-pink-200 focus:border-pink-400"
                      disabled={isProcessing}
                    />
                  </div>
                </div>

                <div className="rounded-lg bg-gradient-to-r from-pink-50 to-purple-50 p-4">
                  <h3 className="mb-2 text-sm font-semibold text-gray-700">
                    Shipping Address
                  </h3>
                  <div className="text-sm text-gray-600">
                    <p>{shippingInfo.fullName}</p>
                    <p>{shippingInfo.address}</p>
                    <p>
                      {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                    </p>
                    <p>{shippingInfo.country}</p>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Processing...
                    </>
                  ) : (
                    <>Pay ${total.toFixed(2)}</>
                  )}
                </Button>
              </form>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                <Lock className="h-3 w-3" />
                <span>Your payment information is encrypted and secure</span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-lg border border-pink-100 bg-white p-6 shadow-lg">
              <h3 className="mb-4 font-bold text-gray-800">Order Total</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-pink-100 pt-2 font-bold">
                  <span className="text-gray-800">Total</span>
                  <span className="text-pink-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
