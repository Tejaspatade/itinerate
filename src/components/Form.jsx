import { useState } from "react";

const Form = ({ onAddItems }) => {
	// State for Controlled Elements
	const [description, setDescription] = useState("");
	const [quantity, setQuantity] = useState(1);

	// Handle Form Submit
	const handleSubmit = (event) => {
		event.preventDefault();

		// Ignore Submit if not input givem
		if (!description) return;

		// Create new item using state
		const newItem = {
			description,
			quantity,
			packed: false,
			id: Date.now(),
		};
		onAddItems(newItem);

		// Clear out values from state i.e. form elements
		setDescription("");
		setQuantity(1);
	};

	return (
		<form className="add-form" onSubmit={handleSubmit}>
			<h3>What Do You Need For Your Next Trip?? ✈️</h3>
			<select
				name=""
				value={quantity}
				onChange={(e) => setQuantity(e.target.value * 1)}
			>
				{Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
					<option value={num} key={num}>
						{num}
					</option>
				))}
			</select>
			<input
				type="text"
				placeholder="Item..."
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<button>Add</button>
		</form>
	);
};

export default Form;
