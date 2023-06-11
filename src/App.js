import React, { useState } from "react";

const App = () => {
	// State Lifted up from Form
	const [items, setItems] = useState([]);

	// Handle adding nee item
	const handleAddItem = (item) => {
		setItems((c) => [...c, item]);
	};

	// Handle Removing an Item
	const handleRemoveItem = (id) => {
		setItems((items) => items.filter((i) => i.id !== id));
	};

	// Handle Packed an Item
	const handlePacked = (id) => {
		setItems((items) =>
			items.map((i) => (i.id === id ? { ...i, packed: !i.packed } : i))
		);
	};

	return (
		<div className="app">
			<Logo />
			<Form onAddItems={handleAddItem} />
			<PackingList
				items={items}
				onDeleteItem={handleRemoveItem}
				onPacked={handlePacked}
			/>
			<Stats items={items} />
		</div>
	);
};

const Logo = () => {
	return <h1>🌴Itinerate🧳</h1>;
};

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

const PackingList = ({ items, onDeleteItem, onPacked }) => {
	return (
		<div className="list">
			<ul>
				{items.map((item) => (
					<Item
						item={item}
						key={item.id}
						onDeleteItem={onDeleteItem}
						onPacked={onPacked}
					/>
				))}
			</ul>
		</div>
	);
};

const Item = ({ item, onDeleteItem, onPacked }) => {
	return (
		<li>
			<input
				type="checkbox"
				value={item.packed}
				onChange={() => onPacked(item.id)}
			/>
			<span style={item.packed ? { textDecoration: "line-through" } : {}}>
				{item.quantity} {item.description}
			</span>
			<button onClick={() => onDeleteItem(item.id)}>❌</button>
		</li>
	);
};

const Stats = ({ items }) => {
	if (!items.length)
		return (
			<p className="stats">
				<em>Start Adding Some items to your Itinery😉!!</em>
			</p>
		);

	const numItems = items.length;
	const packedItems = items.filter((i) => i.packed).length;
	const percent = Math.round((packedItems / numItems) * 100);

	return (
		<footer className="stats">
			{percent === 100 ? (
				<em>You Have Everything Packed! Let's Go!!✈️</em>
			) : (
				<em>
					You Have {numItems} Items On Your List, {packedItems} Packed
					Yet ({percent}%).
				</em>
			)}
		</footer>
	);
};

export default App;
