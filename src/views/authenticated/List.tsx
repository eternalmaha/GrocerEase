import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { ListItemCheckBox } from "../../components/ListItem";
import { FilterListInput } from "../../components/FilterListInput";
import { ListItem, comparePurchaseUrgency } from "../../api";

interface Props {
	data: ListItem[];
	listPath: string | null;
}

export function List({ data: unfilteredListItems, listPath }: Props) {
	const navigate = useNavigate();
	const { listName } = useParams<{ listName: string }>();
	const [searchTerm, setSearchTerm] = useState<string>("");

	const filteredListItems = useMemo(() => {
		return unfilteredListItems
			.filter((item) =>
				item.name.toLowerCase().includes(searchTerm.toLowerCase()),
			)
			.sort(comparePurchaseUrgency);
	}, [searchTerm, unfilteredListItems]);

	// Early return if the list is empty
	if (unfilteredListItems.length === 0) {
		return (
			<>
				<p>{listName}</p>
				<section>
					<h2>Your list is ready!</h2>
					<h3>
						You haven’t added any items yet.
						<br />
						Let’s get started by adding your first item!
					</h3>
					<button
						onClick={() => navigate("/manage-list")}
						aria-label="Start adding items to your list"
					>
						{"Get started!"}
					</button>
				</section>
			</>
		);
	}

	// Main content when list is not empty
	return (
		<>
			<p>{listName}</p>

			<div>
				<section>
					{unfilteredListItems.length > 0 && (
						<FilterListInput
							searchTerm={searchTerm}
							setSearchTerm={setSearchTerm}
						/>
					)}
					<h3>Want to add more items to your list?</h3>
					<button
						onClick={() => navigate("/manage-list")}
						aria-label="Navigate to add more items to your list"
					>
						{"Add items"}
					</button>
				</section>
				{filteredListItems.map((item) => (
					<ListItemCheckBox key={item.id} item={item} listPath={listPath} />
				))}
			</div>
		</>
	);
}
