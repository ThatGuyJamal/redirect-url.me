import "../styles/home.css";

import Link from "next/link";
import { RightArrow, DownArrow, Dot, LinkIcon } from "@/components/icons";
import WaveAnimation from "@/components/ui/WaveAnimation";

export default function Home() {
	return (
		<>
			<WaveAnimation>
				<div className="flex items-center justify-between px-8 py-20 md:px-20 lg:py-48 min-h-screen">
					<div>
						<h1 className="text-5xl font-semibold text-transparent md:text-6xl gradient">
							Redirects Made Easy
						</h1>
						<p className="mt-2 text-lg text-white">
							A simple way to make short web links that redirect to other websites.
						</p>
						<div className="flex gap-2 mt-8">
							<Link
								href="/dashboard"
								className="flex content-center gap-2 px-4 py-2 font-semibold text-white transition-colors duration-200 rounded-lg bg-primary-600 hover:bg-primary-700">
								Get Started
								<div className="m-auto">
									<RightArrow />
								</div>
							</Link>
							<a
								className="flex gap-2 px-4 py-2 font-semibold text-gray-500 transition duration-100 rounded-lg hover:text-gray-600"
								href="#features">
								Learn more
								<div className="m-auto">
									<DownArrow />
								</div>
							</a>
						</div>
					</div>
					<LinkIcon />
				</div>
				<Features />
				<Pricing />
			</WaveAnimation>
		</>
	);
}

const Features = () => {
	const featureInfo = [
		{
			title: "Easy to Use",
			description: "Create and manage redirect links effortlessly.",
		},
		{
			title: "Customizable",
			description: "Personalize your links with custom aliases.",
		},
		{
			title: "Analytics",
			description: "Track the performance of your redirect links with analytics.",
		},
		{
			title: "Password Protection",
			description: "Secure your links with password protection.",
		},
		{
			title: "GeoTargeting",
			description: "Redirect users based on their geographic location.",
		},
		{
			title: "QR Codes",
			description: "Generate QR codes for your redirect links.",
		},
	];

	return (
		<section
			id="features"
			className="py-20 min-h-screen bg-gradient-to-b from-primary-600 to-primary-400">
			<div className="container mx-auto px-4">
				<h2 className="text-4xl font-semibold text-center mb-6">Key Features</h2>
				<div className="grid gap-8 lg:grid-cols-2">
					{featureInfo.map((feature, index) => (
						<div
							key={index}
							className="flex items-start space-x-4 bg-zinc-700 rounded-lg p-6">
							<div className="bg-primary-600 rounded-lg p-3">
								{/* Icon */}
								<Dot />
							</div>
							<div>
								<h3 className="text-lg font-semibold">{feature.title}</h3>
								<p className="text-gray-300">{feature.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

const Pricing = () => {
	const pricingPlans = [
		{
			title: "Free",
			description: "Great for small needs.",
			details: ["25 Redirect URLs"],
			price: "$0/month",
			color: "bg-blue-700",
		},
		{
			title: "Pro",
			description: "Perfect for businesses or hundreds of URLs.",
			details: ["500 Redirect URLs", "Analytics included", "Custom Url aliases"],
			price: "$4/month",
			color: "bg-blue-600 hover:bg-orange-700 ease-in-out transition-all duration-300",
		},
		{
			title: "Enterprise",
			description: "Contact Us For Custom Plans.",
			price: "$custom/month",
			color: "bg-blue-700",
		},
	];

	return (
		<section className="py-20 min-h-screen" id="pricing">
			<div className="container mx-auto px-4">
				<h2 className="text-4xl font-semibold text-center mb-6">Pricing</h2>
				<div className="grid gap-8 lg:grid-cols-3">
					{pricingPlans.map((plan, index) => (
						<div key={index} className={`rounded-lg p-6 ${plan.color}`}>
							<h3 className="text-lg font-semibold mb-4">{plan.title}</h3>
							<p className="text-gray-300 mb-4">{plan.description}</p>
							<ul className="text-gray-300 mt-4 space-y-2">
								{plan.details?.map((detail, index) => (
									<li key={index} className="flex items-center">
										<Dot color="#FFA500" />
										{detail}
									</li>
								))}
							</ul>
							<p className="text-2xl font-semibold mt-10">{plan.price}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
