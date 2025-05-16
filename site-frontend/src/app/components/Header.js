import Link from "next/link";

export function Header() {
	return (
		<header className="py-6 border-b">
			<nav className="max-w-7xl mx-auto flex justify-between items-center px-6">
				<Link href="/">
					<span className="text-xl font-bold">Art by Meredith</span>
				</Link>
				<div className="space-x-6">
					<Link href="/shop">Shop</Link>
					<Link href="/about">About</Link>
				</div>
			</nav>
		</header>
	);
}
