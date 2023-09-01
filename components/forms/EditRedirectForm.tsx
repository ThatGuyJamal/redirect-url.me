"use client";

import { IRedirectEdit } from "@/lib/types";
import { isNumeric, isValidMaxLength, isValidUrl } from "@/lib/utils";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

interface EditRedirectProps {
	isPremium: boolean;
	redirect: IRedirectEdit;
	onSave: (editedRedirect: IRedirectEdit) => void;
	onCancel: () => void;
}

const EditRedirect: React.FC<EditRedirectProps> = ({
	isPremium,
	redirect,
	onSave,
	onCancel,
}) => {
	const [editedRedirect, setEditedRedirect] = useState<IRedirectEdit>(redirect);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setEditedRedirect({
			...editedRedirect,
			[name]: value,
		});
	};

	const handleSave = () => {
		if (!isValidUrl(editedRedirect.redirect_url)) {
			// Show an error message to the user
			toast.error("Please enter a valid URL!");
			return;
		}

		if(!isValidMaxLength(editedRedirect.redirect_name)) {
			toast.error("Please enter a name with less than 35 characters!");
			return;
		}

		if(!isNumeric(editedRedirect.redirect_lifespan?.toString() ?? "0")) {
			toast.error("The lifespan must be a number!");
			return;
		}

		onSave(editedRedirect);
	};

	return (
		<div className="border rounded-lg p-4 shadow-md mt-10">
			<h3 className="text-lg font-semibold text-blue-600">
				Editing {redirect.redirect_name}
			</h3>
			<div className="mb-4">
				<label className="block font-semibold">Update Name</label>
				<input
					type="text"
					name="redirect_name"
					value={editedRedirect.redirect_name}
					onChange={handleChange}
					className="w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500"
				/>
			</div>
			<div className="mb-4">
				<label className="block font-semibold">Update URL</label>
				<input
					type="text"
					name="redirect_url"
					value={editedRedirect.redirect_url}
					onChange={handleChange}
					className="w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500"
				/>
			</div>
			<div className="mb-4">
				<label className="block font-semibold">Update Lifespan</label>
				<input
					type="number"
					name="redirect_lifespan"
					value={editedRedirect.redirect_lifespan || ""}
					onChange={handleChange}
					placeholder={isPremium ? "0" : "Update to Premium to use this feature"}
					disabled={!isPremium}
					className="w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500"
				/>
			</div>
			<div className="flex justify-end">
				<button
					type="button"
					className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
					onClick={handleSave}>
					Save
				</button>
				<button
					type="button"
					className="px-4 py-2 bg-gray-500 text-white rounded-lg ml-2 hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
					onClick={onCancel}>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default EditRedirect;
