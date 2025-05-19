import Head from "next/head";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { ArtworkCard } from "@/app/components/ArtworkCard";

const artworks = [
	{ id: 1, title: "idk", image: "/gallery/img1.jpg" },
	{ id: 2, title: "idk", image: "/gallery/img2.jpg" },
	{ id: 3, title: "idk", image: "/gallery/img3.jpg" },
	{ id: 4, title: "idk", image: "/gallery/img4.jpg" },
	{ id: 5, title: "idk", image: "/gallery/img5.jpg" },
	{ id: 6, title: "idk", image: "/gallery/img6.jpg" },
	{ id: 7, title: "idk", image: "/gallery/img7.jpg" },
	{ id: 8, title: "idk", image: "/gallery/img8.jpg" },
	{ id: 9, title: "idk", image: "/gallery/img9.jpg" },
	{ id: 10, title: "idk", image: "/gallery/img10.jpg" },
	{ id: 11, title: "idk", image: "/gallery/img11.jpg" },
	{ id: 12, title: "idk", image: "/gallery/img12.jpg" },
	{ id: 13, title: "idk", image: "/gallery/img13.jpg" },
	{ id: 14, title: "idk", image: "/gallery/img14.jpg" },
	{ id: 15, title: "idk", image: "/gallery/img15.jpg" },
	{ id: 16, title: "idk", image: "/gallery/img16.jpg" },
	{ id: 17, title: "idk", image: "/gallery/img17.jpg" },
];

export default function Home() {
	return (
		<>
			<Head>
				<title>Art by Meredith W</title>
			</Head>
			<Header />
			<main className="p-6 max-w-7xl mx-auto">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					{artworks.map((art) => (
						<ArtworkCard
							key={art.id}
							title={art.title}
							image={art.image}
						/>
					))}
				</div>
			</main>
			<Footer />
		</>
	);
}
