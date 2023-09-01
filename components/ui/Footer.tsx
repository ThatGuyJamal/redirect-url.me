import { FC } from "react";
import { Discord, Twitter } from "../icons";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
	return (
		<footer className="bg-gradient-to-t from-zinc-900 to-zinc-800 text-white py-6">
			<div className="container mx-auto px-4">
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
					<div>
						<h4 className="text-lg font-semibold mb-4">About Us</h4>
						<p className="text-gray-300">
							We provide easy-to-use tools for creating and managing redirect links.
						</p>
					</div>
					<div>
						<h4 className="text-lg font-semibold mb-4">Features</h4>
						<ul className="text-gray-300">
							<li>Customizable links</li>
							<li>Analytics</li>
							<li>Password protection</li>
							{/* Add more features */}
						</ul>
					</div>
					<div>
						<h4 className="text-lg font-semibold mb-4">Contact</h4>
						<p className="text-gray-300">Email: contact@example.com</p>
						<p className="text-gray-300">Phone: (123) 456-7890</p>
					</div>
					<div>
						<h4 className="text-lg font-semibold mb-4">Follow Us</h4>
						<div className="flex space-x-4">
							<a
								href="#"
								// target="_blank"
								rel="noreferrer"
								className="text-gray-300 hover:text-white">
								<section className="flex items-center m-1">
									<Twitter /> Twitter
								</section>
							</a>
							<a
								href="https://discord.gg/KvrKWZFxzJ"
								target="_blank"
								rel="noreferrer"
								className="text-gray-300 hover:text-white">
								<section className="flex items-center m-1">
									<Discord /> Discord
								</section>
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
