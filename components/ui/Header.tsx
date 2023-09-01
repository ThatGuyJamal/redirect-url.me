"use client";

import { SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface HeaderProps {
	isAuth: boolean;
}

const Header: FC<HeaderProps> = ({ isAuth }) => {
	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [isVisible, setIsVisible] = useState(true);
	const [isCurrentDashboard, setIsCurrentDashboard] = useState(false);

	const pathName = usePathname();

	const handleScroll = () => {
		const currentScrollPos = window.pageYOffset;
		const scrollingUp = prevScrollPos > currentScrollPos;

		setPrevScrollPos(currentScrollPos);
		setIsVisible(scrollingUp || currentScrollPos === 0);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [prevScrollPos]);

	useEffect(() => {
		setIsCurrentDashboard(pathName === "/dashboard");
	}, [pathName]);

	const linkData = !isCurrentDashboard
		? [
				{
					name: "Pricing",
					href: "#pricing",
				},
				{
					name: "Features",
					href: "#features",
				},
				{
					name: "Contact",
					href: "#contact",
				},
		  ]
		: [
				{
					name: "Support",
					href: "#",
				},
				{
					name: "Contact",
					href: "#contact",
				},
		  ];

	return (
		<header
			className={`flex justify-between items-center fixed top-0 left-0 w-full bg-zinc-800 text-white p-4 transition-transform duration-300 ease-in-out transform ${
				isVisible ? "translate-y-0" : "-translate-y-full"
			}`}>
			<div
				className="text-2xl font-bold text-blue-400/90">
				<Link href="/">RedirectUrl.me</Link>
			</div>
			<nav className="hidden md:block">
				<ul className="flex space-x-4">
					{linkData.map((link, index) => (
						<li key={index}>
							<Link href={link.href} className="hover:text-blue-300">
								{link.name}
							</Link>
						</li>
					))}
					{isAuth ? (
						<></>
					) : (
						<li>
							<SignInButton mode="modal" />
						</li>
					)}
				</ul>
			</nav>
			<UserButton afterSignOutUrl="/" afterSwitchSessionUrl="/dashboard" />
		</header>
	);
};

export default Header;
