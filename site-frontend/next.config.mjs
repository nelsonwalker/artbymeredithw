/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			new URL("https://storage.googleapis.com/artbymeredithw/*"),
		],
	},
};

export default nextConfig;
