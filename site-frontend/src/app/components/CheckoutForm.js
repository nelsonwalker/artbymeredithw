"use client";

import React, { useEffect, useState } from "react";
import {
	useStripe,
	useElements,
	PaymentElement,
	AddressElement,
} from "@stripe/react-stripe-js";

export function CheckoutForm({ amount, cart }) {
	const stripe = useStripe();
	const elements = useElements();

	const [clientSecret, setClientSecret] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [fullName, setFullName] = useState("");
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [showPayment, setShowPayment] = useState(false);

	const handleContinue = async () => {
		if (!email) return;
		setLoading(true);

		// Fetch payment intent only after clicking continue
		const res = await fetch("http://localhost:8080/create-payment-intent", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ amount: Math.round(amount * 100) }),
		});
		const data = await res.json();
		setClientSecret(data.clientSecret);
		setShowPayment(true);
		setLoading(false);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);

		if (!stripe || !elements) return;

		const { error: submitError } = await elements.submit();
		if (submitError) {
			setErrorMessage(submitError.message);
			setLoading(false);
			return;
		}

		const { error } = await stripe.confirmPayment({
			elements,
			clientSecret,
			confirmParams: {
				return_url: `${window.location.origin}/payment-success?amount=${amount}`,
				payment_method_data: {
					billing_details: {
						email,
						address: {
							line1: address,
						},
					},
				},
				receipt_email: email,
			},
		});

		if (error.type === "card_error" || error.type === "validation_error") {
			setMessage(error.message);
		} else {
			setMessage("An unexpected error occurred.");
		}

		setLoading(false);
	};

	return (
		<div className="max-w-5xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
			{/* Left: Form */}
			<form
				onSubmit={handleSubmit}
				className="bg-white p-6 rounded-xl shadow-md space-y-6"
			>
				<h2 className="text-xl font-bold text-gray-800 mb-4">
					Your Email
				</h2>

				<div>
					<input
						type="email"
						className="w-full border rounded my-2 px-3 py-2 text-gray-700"
						placeholder="you@example.com"
						value={email}
						required
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label className="text-gray-500 mx-2">
						We will contact you at this email
					</label>
				</div>

				{showPayment && (
					<>
						<div>
							<h2 className="text-xl font-bold text-gray-800 mb-4">
								Shipping Details
							</h2>
							<AddressElement
								options={{
									mode: "shipping",
									allowedCountries: ["AU"],
								}}
								onChange={(e) => {
									setAddress(e.value.address);
									setFullName(e.value.name);
								}}
							/>
						</div>
						<div>
							<h2 className="text-xl font-bold text-gray-800 mb-4">
								Payment
							</h2>
							<PaymentElement />
						</div>
					</>
				)}

				{errorMessage && (
					<div className="text-red-500 text-sm">{errorMessage}</div>
				)}

				{showPayment && (
					<button
						type="submit"
						disabled={!stripe || loading}
						className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded font-semibold transition-all disabled:opacity-50 cursor-pointer"
					>
						{loading
							? "Processing..."
							: `Pay $${amount.toFixed(2)}`}
					</button>
				)}

				{!showPayment && (
					<button
						type="button"
						onClick={handleContinue}
						disabled={!email || loading}
						className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded font-semibold transition-all disabled:opacity-50 cursor-pointer"
					>
						{loading ? "Loading..." : "Continue to Payment"}
					</button>
				)}
			</form>

			{/* Right: Order Summary */}
			<div className="bg-white p-6 rounded-xl shadow-md sticky top-8">
				<h3 className="text-xl font-semibold mb-4 text-gray-800">
					Order Summary
				</h3>
				<ul className="divide-y divide-gray-200 mb-4">
					{cart.map((item) => (
						<li
							key={item.id}
							className="py-2 flex justify-between text-gray-700"
						>
							<div>
								<p className="font-medium">{item.name}</p>
								<p className="text-sm text-gray-500">
									{item.quantity} × $
									{(item.price_cents / 100).toFixed(2)}
								</p>
							</div>
							<p className="font-medium">
								$
								{(
									(item.price_cents / 100) *
									item.quantity
								).toFixed(2)}
							</p>
						</li>
					))}
				</ul>
				<div className="text-lg font-bold text-right text-gray-800">
					Total: ${amount.toFixed(2)}
				</div>
			</div>
		</div>
	);
}
