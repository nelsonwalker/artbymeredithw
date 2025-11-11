"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import Image from "next/image";

export default function ProductDetailPage() {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [showBanner, setShowBanner] = useState(false);

	useEffect(() => {
		if (id) {
			// TODO: update host
			fetch(`http://localhost:8080/products/${id}`)
				.then((res) => res.json())
				.then(setProduct);
		}
	}, [id]);

	const handleAddToCart = () => {
		const existing = JSON.parse(localStorage.getItem("cart") || "[]");
		const found = existing.find((item) => item.id === product.id);
		if (found) {
			found.quantity += 1;
		} else {
			existing.push({ ...product, quantity: 1 });
		}
		localStorage.setItem("cart", JSON.stringify(existing));
		setShowBanner(true);
		setTimeout(() => setShowBanner(false), 3000);
	};

	if (!product) return null;

	return (
		<>
			<Header />
			<main className="max-w-5xl mx-auto p-6">
				<div className="flex flex-col md:flex-row gap-8 items-start">
					<div className="w-full md:w-1/2">
						<Image
							src={product.image_url}
							alt={product.name}
							width={600}
							height={800}
							className="w-full h-auto rounded-md"
						/>
					</div>
					<div className="w-full md:w-1/2">
						<h1 className="text-3xl font-bold mb-2">
							{product.name}
						</h1>
						<p className="text-gray-700 mb-4">
							{product.description}
						</p>
						<p className="text-xl font-semibold mb-6">
							${(product.price_cents / 100).toFixed(2)} AUD
						</p>
						<button
							onClick={handleAddToCart}
							className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
						>
							Add to Cart
						</button>
					</div>
				</div>
				{showBanner && (
					<div className="fixed bottom-6 left-1/2 -translate-x-1/2 animate-slide-up bg-green-600/90 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-lg flex items-center gap-3 border border-green-400/50">
						<div className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full">
							<span className="text-lg">✓</span>
						</div>
						<span className="font-medium tracking-wide">
							Item added to cart
						</span>
					</div>
				)}
			</main>
			<Footer />
		</>
	);
}
