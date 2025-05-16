import Head from "next/head";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";

export default function Shop() {
	return (
		<>
			<Head>
				<title>Shop - Art by Meredith W</title>
			</Head>
			<Header />
			<main className="p-6 max-w-4xl mx-auto text-center">
				<h1 className="text-4xl font-bold mb-6">Shop</h1>
				<p className="text-lg text-gray-600">
					Coming soon! Originals and prints will be available for
					purchase.
				</p>
			</main>
			<Footer />
		</>
	);
}
