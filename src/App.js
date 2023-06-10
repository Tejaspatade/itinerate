import React, { useState } from "react";

const App = () => {
	return (
		<div className="app">
			<Logo />
			<Form />
			<PackingList />
			<Stats />
		</div>
	);
};

const initialItems = [
	{ id: 1, description: "Passports", quantity: 2, packed: true },
	{ id: 2, description: "Socks", quantity: 12, packed: false },
	{ id: 3, description: "IDs", quantity: 2, packed: false },
];

const Logo = () => {
	return <h1>🌴Itinerate🧳</h1>;
};

const Form = () => {
	// State for Controlled Elements
	const [description, setDescription] = useState("");
	const [quantity, setQuantity] = useState(1);

	// Handle Form Submit
	const handleSubmit = (event) => {
		event.preventDefault();

		//
		if (!description) return;

		// Create new item using state
		const newItem = {
			description,
			quantity,
			packed: false,
			id: Date.now(),
		};
		console.log(newItem);

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

const PackingList = () => {
	return (
		<div className="list">
			<ul>
				{initialItems.map((item) => (
					<Item item={item} key={item.id} />
				))}
			</ul>
		</div>
	);
};

const Item = ({ item }) => {
	return (
		<li>
			<span style={item.packed ? { textDecoration: "line-through" } : {}}>
				{item.quantity} {item.description}
			</span>
			<button>❌</button>
		</li>
	);
};

const Stats = () => {
	return (
		<footer className="stats">
			<em>You Have X Items On Your List, Y Packed.</em>
		</footer>
	);
};

export default App;
