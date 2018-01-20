const filterItems = (filter, items) => {
	return items.filter(item => {
		if (filter === "ALL") return true;
		if (filter === "COMPLETED") return item.complete;
		if (filter === "ACTIVE") return !item.complete;
	});
};

export default filterItems; 