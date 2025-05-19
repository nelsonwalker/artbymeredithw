"use client";

import Head from "next/head";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Shop() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		// TODO: update host
		fetch("http://localhost:8080/products")
			.then((res) => res.json())
			.then(setProducts);
	}, []);

	return (
		<>
			<Head>
				<title>Shop - Art by Meredith W</title>
			</Head>
			<Header />
			<main className="p-6 max-w-6xl mx-auto">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					{products.map((product) => (
						<Link
							key={product.id}
							href={`/shop/${product.id}`}
							className="block border rounded-xl p-4 shadow hover:shadow-lg"
						>
							<img // TODO: display image based on image URL
								// src={product.image_url}
								src={"/gallery/img" + product.id + ".jpg"}
								alt={product.name}
								className="w-full h-48 object-cover rounded-md mb-4"
							/>
							<h2 className="text-xl font-semibold">
								{product.name}
							</h2>
							<p className="text-gray-600">
								${(product.price_cents / 100).toFixed(2)} AUD
							</p>
						</Link>
					))}
				</div>
			</main>
			<Footer />
		</>
	);
}
