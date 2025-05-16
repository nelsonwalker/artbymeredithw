import Image from "next/image";

export function ArtworkCard({ title, image, showTitle = false }) {
	return (
		<div className="rounded-lg overflow-hidden shadow hover:shadow-lg transition">
			<Image
				src={image}
				alt={title}
				width={600}
				height={800}
				className="object-cover"
			/>
			{showTitle && (
				<div className="p-4">
					<h2 className="text-lg font-semibold">{title}</h2>
				</div>
			)}
		</div>
	);
}
