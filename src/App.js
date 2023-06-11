import React, { useState } from "react";

import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";

const App = () => {
	// State Lifted up from Form
	const [items, setItems] = useState([]);

	// Handle Adding nee item
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

	const handleReset = () => {
		const confirm = window.confirm(
			"🔴🔴Do You Really Want to Clear the Itinery?🔴🔴"
		);
		if (confirm) setItems([]);
	};

	return (
		<div className="app">
			<Logo />
			<Form onAddItems={handleAddItem} />
			<PackingList
				items={items}
				onDeleteItem={handleRemoveItem}
				onPacked={handlePacked}
				onReset={handleReset}
			/>
			<Stats items={items} />
		</div>
	);
};

export default App;
