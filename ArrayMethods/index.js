// 1: reduce
Array.prototype.myReduce = function (callback, init) {
	let previousValue = init;
	for (let i = 0; i < this.length; i++) {
		previousValue = callback(previousValue, this[i], i, this);
	}
	return previousValue;
};

console.log([1, 2, 3, 4].reduce((sum, cur, curIndex, arr) => (sum += cur), 0));
console.log(
	[1, 2, 3, 4].myReduce((sum, cur, curIndex, arr) => (sum += cur), 0)
);

// 2: filter
Array.prototype.myFilter = function (callback, thisArg) {
	let res = [];
	for (let i = 0; i < this.length; i++) {
		if (callback(this[i], i, this)) {
			res.push(this[i]);
		}
	}
	return res;
};

console.log(
	[1, 2, 3, 4, 5, 6, 7, 8, 9].filter(
		(curValue, curIndex, arr) => curValue % 2 == 0,
		this
	)
);
console.log(
	[1, 2, 3, 4, 5, 6, 7, 8, 9].myFilter(
		(curValue, curIndex, arr) => curValue % 2 == 0,
		this
	)
);

// 3: find
Array.prototype.myFind = function (callback) {
	for (let i = 0; i < this.length; i++) {
		if (callback(this[i], i, this)) {
			return this[i];
		}
	}
};
console.log([1, 2, 3, 4, 5, 6].find((value, index, arr) => value > 4));
console.log([1, 2, 3, 4, 5, 6].myFind((value, index, arr) => value > 4));

// 4: push
Array.prototype.myPush = function (element) {
	let len = this.length;
	this[len] = element;
	len++;
	this.length = len;
	return len;
};
let testArr = [1, 2, 3];
console.log(testArr.push(4), testArr);
let testArr2 = [1, 2, 3];
console.log(testArr2.myPush(4), testArr2);

// 5: pop
Array.prototype.myPop = function () {
	// let res = [];
	// for (let i = 0; i < this.length - 1; i++) {
	// 	res[i] = this[i];
	// }
	let len = this.length,
		last = this[len - 1];
	this[len - 1] = null;
	len--;
	this.length = len;
	return last;
};
console.log(testArr.pop(), testArr);
console.log(testArr2.myPop(), testArr2);

// 6: reverse
Array.prototype.myReverse = function () {
	let i = 0,
		j = this.length - 1;
	while (i < j) {
		let tmp = this[i];
		this[i] = this[j];
		this[j] = tmp;
		i++;
		j--;
	}
	return this;
};
let testReverse = [1, 2, 3, 4, 5];
let testReverse2 = [1, 2, 3, 4, 5, 6];
console.log(testReverse.reverse());
console.log(testReverse.reverse());
console.log(testReverse2.myReverse());
console.log(testReverse2.myReverse());
