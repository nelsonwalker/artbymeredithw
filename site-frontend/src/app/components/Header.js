"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
	const pathname = usePathname();
	const [cartCount, setCartCount] = useState(0);

	useEffect(() => {
		const updateCart = () => {
			const cart = JSON.parse(localStorage.getItem("cart") || "[]");
			const count = cart.reduce(
				(total, item) => total + item.quantity,
				0
			);
			setCartCount(count);
		};

		updateCart();
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			const cart = JSON.parse(localStorage.getItem("cart") || "[]");
			const count = cart.reduce(
				(total, item) => total + item.quantity,
				0
			);
			setCartCount(count);
		}, 500);

		return () => clearInterval(interval);
	}, []);

	const navItems = [
		{ name: "Portfolio", href: "/" },
		{ name: "Shop", href: "/shop" },
		{ name: "About", href: "/about" },
		{ name: "Cart", href: "/cart" },
	];

	return (
		<header className="border-b shadow-sm p-4">
			<nav className="max-w-6xl mx-auto flex justify-between items-center">
				<div className="text-xl font-bold">artbymeredithw</div>
				<ul className="flex space-x-6 items-center">
					{navItems.map(({ name, href }) => (
						<li key={name}>
							<Link
								href={href}
								className={`hover:underline ${
									pathname === href ? "font-bold" : ""
								} relative`}
							>
								{name}
								{name === "Cart" && cartCount > 0 && (
									<span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
										{cartCount}
									</span>
								)}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}
