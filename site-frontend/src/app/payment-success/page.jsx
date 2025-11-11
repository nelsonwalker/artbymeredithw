"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const email = searchParams.get("email");
  const address = searchParams.get("address");

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);

    // clear cart after storing it locally for display
    localStorage.removeItem("cart");
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price_cents * item.quantity,
    0
  );

  return (
    <main className="max-w-6xl mx-auto p-10 mt-12 text-white bg-gradient-to-tr from-blue-500 to-purple-500 rounded-2xl shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left side: Thank You message */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl font-extrabold">🎉 Thank You!</h1>
          <p className="text-xl">Your payment was successful.</p>

          <div className="bg-white text-purple-600 py-4 px-6 rounded-lg inline-block text-4xl font-bold shadow-md">
            ${amount ? amount : (total / 100).toFixed(2)} AUD
          </div>

          {email && (
            <p className="mt-4 text-white/90">
              A confirmation has been sent to <b>{email}</b>.
            </p>
          )}

          <p/>

          <Link
            href="/"
            className="inline-block mt-6 bg-white text-purple-600 font-semibold px-6 py-3 rounded-lg hover:bg-purple-50 transition"
          >
            Return to Home
          </Link>
        </div>

        {/* Right side: Order summary */}
        <div className="bg-white text-gray-900 rounded-xl p-6 shadow-md h-full overflow-auto max-h-[500px]">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">
            Order Summary
          </h2>

          {cartItems.length === 0 ? (
            <p>No items found (cart was cleared).</p>
          ) : (
            <ul className="divide-y">
              {cartItems.map((item) => (
                <li key={item.id} className="py-4 flex justify-between">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    ${(item.price_cents * item.quantity / 100).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          )}

          <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>
              ${amount ? amount : (total / 100).toFixed(2)} AUD
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
