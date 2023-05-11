const h1 = document.querySelector("h1");
const categoryOptions = document.getElementById("categories");
const itemOptions = document.getElementById("items");
const items = [
	{
		name: "apple",
		category: "fruit",
	},
	{
		name: "Cucumber",
		category: "vegetable",
	},
	{
		name: "Banana",
		category: "fruit",
	},
	{
		name: "Celery",
		category: "vegetable",
	},
	{
		name: "orange",
		category: "fruit",
	},
	{
		name: "sausage",
		category: "meat",
	},
	{
		name: "bacon",
		category: "meat",
	},
];

const changeH1 = (text) => {
	h1.innerHTML = text;
};

const reloadItems = (category) => {
	itemOptions.innerHTML = "";
	for (let item of items) {
		if (item.category === category) {
			itemOptions.innerHTML += `<option value=${item.name} class=${item.category}>${item.name}</option>`;
		}
	}
};

reloadItems("fruit");

categoryOptions.addEventListener("change", () => {
	if (categoryOptions.value == "fruit") {
		reloadItems("fruit");
		changeH1(itemOptions.value);
	} else if (categoryOptions.value == "vegetable") {
		reloadItems("vegetable");
		changeH1(itemOptions.value);
	} else {
		reloadItems("meat");
		changeH1(itemOptions.value);
	}
});
itemOptions.addEventListener("change", () => {
	changeH1(itemOptions.value);
});
