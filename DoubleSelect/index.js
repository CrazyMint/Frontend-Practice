let h1 = document.querySelector("h1");
const changeH1 = (text) => {
	h1.innerHTML = text;
};
const hideItems = (items) => {
	for (let x of items) {
		x.setAttribute("hidden", true);
	}
};
let category = document.getElementById("categories");
if (category == "fruit") {
} else if (category == "vegetable") {
} else {
}
let item = document.getElementById("items");
let fruitItems = document.getElementsByClassName("fruit");
let vegeItems = document.getElementsByClassName("vegetable");
let meatItems = document.getElementsByClassName("meat");

console.log(fruitItems[0]);
console.log(category.value);
console.log(item.value);
