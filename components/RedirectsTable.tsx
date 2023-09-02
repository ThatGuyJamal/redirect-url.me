"use client";

import { useState } from "react";
import { IRedirect, IRedirectEdit } from "@/lib/types";

import { FC } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "react-hot-toast";
import Link from "next/link";
import EditRedirect from "./forms/EditRedirectForm";

interface RedirectsTableProps {
	isPremium: boolean;
	username: string | null | undefined;
	redirects: IRedirect[] | undefined;
	loadInterval?: number;
}

const RedirectsTable: FC<RedirectsTableProps> = ({
	isPremium,
	username,
	redirects,
	loadInterval,
}) => {
	const [confirmDelete, setConfirmDelete] = useState<Id<"redirects"> | null>(
		null
	);
	const [editableRedirect, setEditableRedirect] = useState<IRedirectEdit | null>(
		null
	);

	if (!loadInterval) loadInterval = 200;

	const destroy = useMutation(api.redirects.destroy);
	const update = useMutation(api.redirects.update);

	const handleDeleteClick = (redirectId: Id<"redirects">) => {
		setConfirmDelete(redirectId);
	};

	const handleCancelDelete = () => {
		setConfirmDelete(null); // Clear the confirmation state
	};

	const handleConfirmDelete = (id: Id<"redirects">) => {
		console.log("Deleting redirect with ID:", confirmDelete);

		toast.promise(
			destroy({
				id,
			}),
			{
				loading: "Deleting your data...",
				success: "Deleted!",
				error: "Failed to delete...",
			}
		);

		setConfirmDelete(null); // Clear the confirmation state
	};

	// Function to handle edit click
	const handleEditClick = (redirect: IRedirectEdit) => {
		setEditableRedirect(redirect);
	};

	// Function to handle cancel edit
	const handleCancelEdit = () => {
		setEditableRedirect(null);
	};

	// Function to handle save edit
	const handleSaveEdit = (editedRedirect: IRedirectEdit) => {
		console.log("Saving edited redirect:", editedRedirect);

		toast.promise(
			update({
				id: editedRedirect._id,
				redirect_name: editedRedirect.redirect_name,
				redirect_url: editedRedirect.redirect_url,
				redirect_lifespan: editedRedirect.redirect_lifespan,
			}),
			{
				loading: "Saving your data...",
				success: "Saved!",
				error: "Failed to save...",
			}
		);

		// Clear the editable redirect
		setEditableRedirect(null);
	};
	return (
		<div className="p-8 mt-16">
			<h1 className="text-2xl font-bold mb-4 text-red-400">
				{username ?? "Your"} Redirect Urls
			</h1>
			<ul className="space-y-4">
				{redirects?.map((redirect) => (
					<li
						key={redirect?._id}
						className="border rounded-lg p-4 bg-zinc-200 shadow-md">
						<h3 className="text-lg font-semibold text-blue-600">
							Redirect Name: {redirect?.redirect_name}
						</h3>
						<p className="text-gray-600 underline">
							URL:{" "}
							<a
								target="_blank"
								href={`${window.location.origin}/r/${redirect?.redirect_code}`}>
								{`${window.location.origin}/r/${redirect?.redirect_code}`}
							</a>
						</p>
						<p className="text-gray-600">
							Redirect Lifespan: {redirect?.redirect_lifespan || "0"}
						</p>
						<p className="text-gray-600">
							Redirect Code:{" "}
							<Link href={`r/${redirect?.redirect_code}`}>
								{redirect?.redirect_code}
							</Link>
						</p>
						<p className="text-gray-600">
							Creation Time: {new Date(redirect!._creationTime ?? 0).toLocaleString()}
						</p>
						<button
							className="text-red-500 cursor-pointer mt-2"
							onClick={() => handleDeleteClick(redirect!._id)}>
							Delete
						</button>
						<button
							className="text-yellow-500 cursor-pointer mt-2 ml-2"
							onClick={() =>
								handleEditClick({
									_id: redirect?._id!,
									redirect_name: redirect?.redirect_name!,
									redirect_url: redirect?.redirect_url!,
									redirect_lifespan: redirect?.redirect_lifespan,
								})
							}>
							Edit
						</button>
						{confirmDelete === redirect?._id ? (
							<div className="mt-4">
								<p className="text-red-600 font-semibold">Confirm Deletion?</p>
								<button
									className="px-2 py-1 bg-red-500 text-white rounded-md mr-2"
									onClick={() => handleConfirmDelete(redirect._id)}>
									Confirm
								</button>
								<button
									className="px-2 py-1 border border-gray-400 rounded-md text-black"
									onClick={handleCancelDelete}>
									Cancel
								</button>
							</div>
						) : null}
					</li>
				))}
			</ul>
			{editableRedirect && (
				<EditRedirect
					isPremium={isPremium}
					redirect={editableRedirect}
					onSave={handleSaveEdit}
					onCancel={handleCancelEdit}
				/>
			)}
		</div>
	);
};

export default RedirectsTable;
