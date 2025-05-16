import Head from "next/head";
import Image from "next/image";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function About() {
	return (
		<>
			<Head>
				<title>About - Art by Meredith W</title>
			</Head>
			<Header />
			<main className="px-6 py-12 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
				<div className="flex justify-center">
					<div className="overflow-hidden rounded-[2rem]">
						<Image
							src="/about-photo.jpg"
							alt="Artist"
							width={300}
							height={300}
							className="object-cover"
						/>
					</div>
				</div>

				<div>
					<h1 className="text-5xl font-bold mb-6 text-white-400">
						About
					</h1>
					<p className="text-md leading-7 mb-4">
						Hello, I’m Meredith. I’m an Australian artist whose work
						explores emotion, identity, and organic forms across a
						range of mediums. Inspired by nature and personal
						reflection, I enjoy creating intricate and dreamlike
						compositions that invite introspection.
					</p>
					<p className="text-md leading-7 mb-6">
						When I’m not creating art, you’ll find me reading,
						walking through botanical gardens, or drinking tea by
						the ocean.
					</p>

					<div className="mt-6 flex gap-4">
						<a
							href="https://instagram.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-white-500 hover:text-pink-700 text-4xl"
						>
							<FontAwesomeIcon icon={faInstagram} />
						</a>
						<a
							href="mailto:hello@meredithw.art"
							className="text-white-500 hover:text-pink-700 text-4xl"
						>
							<FontAwesomeIcon icon={faEnvelope} />
						</a>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
