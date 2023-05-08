// #1 reverse a number
const q1 = (x) => {
	let res = 0;
	while (x > 0) {
		res *= 10;
		res += x % 10;
		x = Math.floor(x / 10);
	}
	console.log(res);
};
q1(32243);

// #2 check if a passed string is palindrome
const q2 = (s) => {
	let i = 0,
		j = s.length - 1;
	while (i <= j) {
		while (i < j && s[i] == " ") {
			i++;
		}
		while (i < j && s[j] == " ") {
			j--;
		}
		if (s[i] == s[j]) {
			i++;
			j--;
		} else {
			return false;
		}
	}
	return true;
};
console.log(q2("madam"));
console.log(q2("nurses run"));

// #3 generate all combinations of a string
const q3 = (s) => {
	let res = [];
	const helper = (s, index, cur) => {
		res.push([...cur]);
		for (let i = index; i < s.length; i++) {
			cur.push(s[i]);
			helper(s, i + 1, cur);
			cur.pop();
		}
		return;
	};
	helper(s, (index = 0), []);
	console.log(res);
};

q3("dog");

// #4 return a passed string with letters in alphabetical order
const q4 = (s) => {
	return s.split("").sort().join("");
};
console.log(q4("webmaster"));

// #5 accepts a string as a parameter and converts the first letter of each word of the string in upper case.
const q5 = (s) => {
	return s
		.split(" ")
		.map((word) => word[0].toUpperCase() + word.substring(1))
		.join(" ");
};
console.log(q5("the quick brown fox"));

// #6 find the longest word within the string
const q6 = (s) => {
	let i = 0;
	let curlen = 1,
		maxlen = 1,
		res = "";
	for (let j = 0; j < s.length; j++) {
		if (s[j] != " ") {
			curlen++;
		} else {
			i = j + 1;
			curlen = 1;
		}
		if (curlen > maxlen) {
			maxlen = curlen;
			res = s.substring(i, j + 1);
		}
	}
	return res;
};
console.log(q6("Web Development Tutorial"));

// #7 counts the number of vowels within the string
const q7 = (s) => {
	let count = 0;
	for (let i = 0; i < s.length; i++) {
		if (
			s[i] == "a" ||
			s[i] == "e" ||
			s[i] == "i" ||
			s[i] == "o" ||
			s[i] == "u"
		) {
			count++;
		}
	}
	return count;
};
console.log(q7("The quick brown fox"));

// #8 check the number is prime or not
const q8 = (num) => {
	if (!Number.isInteger(num) || num <= 1 || num % 2 == 0 || num % 3 == 0) {
		return false;
	}
	for (let i = 5; i < Math.sqrt(num); i++) {
		if (num % i == 0) return false;
	}
	return true;
};
console.log(q8(23));

// #9 accepts an argument and returns the type
const q9 = (input) => typeof input;
console.log(q9(() => {}));

// #10 returns the n rows by n columns identity matrix
const q10 = (n) => {
	let res = [];
	for (let i = 0; i < n; i++) {
		let row = [];
		for (let j = 0; j < n; j++) {
			if (i == j) {
				row.push(1);
			} else {
				row.push(0);
			}
		}
		res.push(row);
	}
	return res;
	console.log(res);
};

console.log(q10(5));

// #11 find the second lowest and second greatest numbers
const q11 = (arr) => {
	let lowest = Number.MAX_VALUE,
		greatest = Number.MIN_VALUE,
		secondLowest = Number.MAX_VALUE,
		secondGreatest = Number.MIN_VALUE;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] > greatest) {
			secondGreatest = greatest;
			greatest = arr[i];
		} else if (arr[i] > secondGreatest) {
			secondGreatest = arr[i];
		}

		if (arr[i] < lowest) {
			secondLowest = lowest;
			lowest = arr[i];
		} else if (arr[i] < secondLowest) {
			secondLowest = arr[i];
		}
	}
	return [secondLowest, secondGreatest];
};
console.log(q11([1, 2, 3, 4, 5]));

// #12 whether a number is perfect
const q12 = (num) => {
	let sum = 0;
	for (let i = 1; i * i < num; i++) {
		if (num % i == 0) {
			sum += i;
			sum += num / i;
		}
	}
	return sum == num * 2;
};
console.log(q12(8128));

// #13 compute the factors of a positive integer
const q13 = (num) => {
	let res = [];
	for (let i = 1; i * i <= num; i++) {
		if (num % i == 0) {
			res.push(i);
			res.push(num / i);
		}
	}
	return res.sort((a, b) => a - b);
};
console.log(q13(20));

// #14 convert an amount to coins
const q14 = (num) => {
	let coins = [50, 25, 10, 5, 2, 1];
	let i = 0,
		res = [];
	while (i < coins.length) {
		if (num >= coins[i]) {
			res.push(coins[i]);
			num -= coins[i];
		} else {
			i++;
		}
	}
	return res;
};
console.log(q14(46));

// #15 compute the value of bn where n is the exponent and b is the bases. Accept b and n from the user and display the result.
const q15 = () => {
	const b = Number(prompt("Please enter b: "));
	const n = Number(prompt("Please enter n: "));
	let res = 1;
	for (let i = 1; i <= n; i++) {
		res *= b;
	}
	return res;
};
// console.log(q15());

// #16 extract unique characters from a string.
const q16 = (s) => {
	let unique = new Set(s),
		res = "";
	for (let x of unique) {
		res += x;
	}
	return res;
};
console.log(q16("thequickbrownfoxjumpsoverthelazydog"));

// #17 get the number of occurrences of each letter in specified string
const q17 = (s) => {
	let map = {};
	for (let i = 0; i < s.length; i++) {
		if (!/[a-zA-Z]/.test(s[i])) continue;
		if (map[s[i]]) {
			map[s[i]] = map[s[i]] + 1;
		} else {
			map[s[i]] = 1;
		}
	}
	return map;
};
console.log(q17("aabb bacacb ofhwuq"));
console.log(q17("thequickbrownfoxjumpsoverthelazydog"));

// #18 searching JavaScript arrays with a binary search
const q18 = (arr, target) => {
	let i = 0,
		j = arr.length - 1;
	while (i <= j) {
		let mid = i + Math.floor((j - i) / 2);
		if (arr[mid] == target) {
			return mid;
		} else if (arr[mid] < target) {
			i = mid + 1;
		} else {
			j = mid - 1;
		}
	}
	return -1;
};
console.log(q18([1, 2, 3, 3, 4, 5, 6, 7, 7, 8], 3));

// #19 returns array elements larger than a number
const q19 = (arr, num) => {
	let res = [];
	for (let x of arr) {
		if (x > num) {
			res.push(x);
		}
	}
	return res;
};
console.log(q19([1, 2, 3, 4, 45, 6, 6, 7, 8, 89, 10], 8));

// #20 generates a string id (specified length) of random characters
const q20 = (l) => {
	let res = "";
	let characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < l; i++) {
		res += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return res;
};
console.log(q20(5));
console.log(q20(10));

// #21 get all possible subset with a fixed length (for example 2)
const q21 = (arr, l) => {
	var res = [];
	const helper = (arr, cur, index) => {
		if (cur.length == l) {
			res.push([...cur]);
			return;
		}
		for (let i = index; i < arr.length; i++) {
			cur.push(arr[i]);
			helper(arr, cur, i + 1);
			cur.pop();
		}
	};
	helper(arr, [], 0);
	return res;
};
console.log("q21: ", q21([1, 2, 3, 4], 2));

// #22 accepts two arguments, a string and a letter and the function will count the number of occurrences of the specified letter within the string.
const q22 = (s, c) => {
	let res = 0;
	for (let i = 0; i < s.length; i++) {
		if (s[i] == c) {
			res++;
		}
	}
	return res;
};
console.log(q22("microsoft.com", "o"));

// #23  find the first not repeated character.
const q23 = (s) => {
	let count = new Set();
	let res = "";
	for (let i = 0; i < s.length; i++) {
		if (!count.has(s[i])) {
			res = s[i];
			count.add(s[i]);
		}
	}
	return res;
};
console.log(q23("abacddbec"));

// #24 apply Bubble Sort algorithm.
const q24 = (arr) => {
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr.length - i; j++) {
			if (arr[j] < arr[j + 1]) {
				let tmp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = tmp;
			}
		}
	}
	return arr;
};
console.log(
	q24([12, 345, 4, 546, 122, 84, 98, 64, 9, 1, 3223, 455, 23, 234, 213])
);

// #25 accept a list of country names as input and returns the longest country name as output.
const q25 = (list) => {
	let res = "";
	for (let i = 0; i < list.length; i++) {
		if (list[i].length > res.length) {
			res = list[i];
		}
	}
	return res;
};
console.log(q25(["Australia", "Germany", "United States of America"]));

// #26 find longest substring in a given a string without repeating characters
const q26 = (s) => {
	let map = new Map(),
		l = 0,
		res = "",
		maxlen = 0,
		maxL = 0,
		maxR = 0;
	for (let r = 0; r < s.length; r++) {
		if (map.has(s[r])) {
			l = Math.max(l, map.get(s[r]) + 1);
		}
		map.set(s[r], r);
		if (r - l + 1 > maxlen) {
			maxlen = r - l + 1;
			maxL = l;
			maxR = r;
		}
	}
	return s.substring(maxL, maxR + 1);
};
console.log(q26("pwwkew"));

// #27 returns the longest palindrome in a given string
const q27 = (s) => {
	let maxLen = 0,
		maxR = 0;
	const expand = (l, r, s) => {
		while (l >= 0 && r < s.length && s[l] == s[r]) {
			l--;
			r++;
		}
		let curLen = r - 1 - (l + 1) + 1;
		if (curLen > maxLen) {
			maxR = r - 1;
			maxLen = curLen;
		}
	};
	for (let i = 0; i < s.length; i++) {
		expand(i, i, s);
		expand(i, i + 1, s);
	}
	return s.substring(maxR - maxLen + 1, maxR + 1);
};

console.log(q27("babad"));
console.log(q27("cbbd"));

// #28 Write a JavaScript program to pass a 'JavaScript function' as parameter.
const q28 = (callback) => {
	return callback();
};
q28(() => console.log("hello"));

// #29 Write a JavaScript function to get the function name
function q29(x) {
	const f = function () {
		return f.caller;
	};
	return f().name;
}
console.log(q29());
