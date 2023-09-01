"use client";

import { api } from "@/convex/_generated/api";
import { CreateRedirectFormState, PartialClerkUser } from "@/lib/types";
import { isValidMaxLength, isValidUrl } from "@/lib/utils";
import { useMutation } from "convex/react";
import { FC, useState } from "react";
import { toast } from "react-hot-toast";

interface CreateRedirectFormProps {
	user: PartialClerkUser;
	isPremium: boolean;
}

const CreateRedirectForm: FC<CreateRedirectFormProps> = ({
	isPremium,
	user,
}) => {
	const [formData, setFormData] = useState<CreateRedirectFormState>({
		name: "",
		link: "",
		lifespan: isPremium ? 0 : undefined,
	});

	const create = useMutation(api.redirects.create);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!isValidUrl(formData.link)) {
			toast.error("Please enter a valid URL!");
			return;
		}

		if (!isValidMaxLength(formData.name)) {
			toast.error("Please enter a name with less than 35 characters!");
			return;
		}

		create({
			redirect_name: formData.name,
			redirect_url: formData.link,
			redirect_lifespan: formData.lifespan,
			user_email: user?.primaryEmailAddress?.emailAddress ?? "",
			isPremium,
			user_email_verified: user?.hasVerifiedEmailAddress ?? false,
		});

		toast.success("Redirect created!");

		setFormData({ name: "", link: "", lifespan: isPremium ? 0 : undefined });
	};

	const handleCancel = () => {
		setFormData({ name: "", link: "", lifespan: isPremium ? 0 : undefined });
	};

	return (
		<div className="bg-zinc-700 p-4 shadow rounded-lg mt-[50px] lg:mt-[0]">
			<h2 className="text-xl font-semibold mb-4">Create a Redirect</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label className="block font-semibold">Name</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className="w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block font-semibold">Link</label>
					<input
						type="text"
						name="link"
						value={formData.link}
						onChange={handleChange}
						className="w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block font-semibold">Lifespan</label>
					<input
						type="number"
						name="lifespan"
						value={formData.lifespan || ""}
						onChange={handleChange}
						placeholder={isPremium ? "0" : "Unlock premium to set lifespan"}
						disabled={!isPremium} // Disable when not premium
						className="w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500"
					/>
				</div>
				<div className="flex justify-end">
					<button
						type="button"
						onClick={handleCancel}
						className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600">
						Cancel
					</button>
					<button
						type="submit"
						className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-2">
						Create
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateRedirectForm;
