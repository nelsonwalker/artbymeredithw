"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "@/app/components/CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
	const [cart, setCart] = useState([]);
	const [amount, setAmount] = useState(0);

	useEffect(() => {
		const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
		setCart(storedCart);

		const total = storedCart.reduce((sum, item) => {
			return sum + (item.price_cents / 100) * item.quantity;
		}, 0);

		setAmount(total);
	}, []);

	if (cart.length === 0) {
		return <div className="text-center p-8">Your cart is empty.</div>;
	}

	return (
		<Elements
			stripe={stripePromise}
			options={{
				mode: "payment",
				amount: Math.round(amount * 100), // in cents
				currency: "aud",
			}}
		>
			<CheckoutForm cart={cart} amount={amount} />
		</Elements>
	);
}
