import { useState } from "react";
import Item from "./Item";

const PackingList = ({ items, onDeleteItem, onPacked, onReset }) => {
	// State for sort criteria
	const [sortCriteria, setSortCriteria] = useState("input");

	// Sorting
	let sortedItems;
	if (sortCriteria === "input") sortedItems = items;
	if (sortCriteria === "description")
		sortedItems = items
			.slice()
			.sort((a, b) => a.description.localeCompare(b.description));
	if (sortCriteria === "packed")
		sortedItems = items
			.slice()
			.sort((a, b) => Number(a.packed) - Number(b.packed));

	return (
		<div className="list">
			<ul>
				{sortedItems.map((item) => (
					<Item
						item={item}
						key={item.id}
						onDeleteItem={onDeleteItem}
						onPacked={onPacked}
					/>
				))}
			</ul>
			<div className="actions">
				<select
					value={sortCriteria}
					onChange={(e) => {
						setSortCriteria(e.target.value);
					}}
				>
					<option value="input">Sort By Input</option>
					<option value="description">Sort By Description</option>
					<option value="packed">Sort By Packed Status</option>
				</select>
				<button onClick={onReset}>Clear List</button>
			</div>
		</div>
	);
};

export default PackingList;
