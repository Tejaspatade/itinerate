const Stats = ({ items }) => {
	if (!items.length)
		return (
			<p className="stats">
				<em>Start Adding Some items to your Itinery📝!!</em>
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

export default Stats;
