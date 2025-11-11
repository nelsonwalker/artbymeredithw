"use client";

import { useEffect, useState } from "react";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { ArtworkCard } from "@/app/components/ArtworkCard";

export default function Home() {
	const [artworks, setArtworks] = useState([]);

	useEffect(() => {
		async function fetchArtworks() {
			try {
				// Replace with your GCS bucket name
				const bucketName = "artbymeredithw";
				const res = await fetch(
					`https://storage.googleapis.com/storage/v1/b/${bucketName}/o`
				);
				const data = await res.json();

				if (data.items) {
					const imageItems = data.items
						.filter((item) =>
							item.contentType?.startsWith("image/")
						)
						.map((item, index) => ({
							id: index + 1,
							title: item.name,
							image: `https://storage.googleapis.com/${bucketName}/${item.name}`,
						}));

					setArtworks(imageItems);
				}
			} catch (error) {
				console.error("Error loading artworks:", error);
			}
		}

		fetchArtworks();
	}, []);

	return (
		<>
			<Header />
			<main className="p-6 max-w-7xl mx-auto">
				<h1 className="text-4xl font-bold mb-8 text-center">
					Portfolio
				</h1>

				{artworks.length === 0 ? (
					<p className="text-center text-gray-500">
						Loading artworks...
					</p>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
						{artworks.map((art) => (
							<ArtworkCard
								key={art.id}
								title={art.title}
								image={art.image}
							/>
						))}
					</div>
				)}
			</main>
			<Footer />
		</>
	);
}
