// #1 reverse a number
q1 = (x) => {
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
q2 = (s) => {
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
q3 = (s) => {
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
q4 = (s) => {
	return s.split("").sort().join("");
};
console.log(q4("webmaster"));

// #5 accepts a string as a parameter and converts the first letter of each word of the string in upper case.
q5 = (s) => {
	return s
		.split(" ")
		.map((word) => word[0].toUpperCase() + word.substring(1))
		.join(" ");
};
console.log(q5("the quick brown fox"));

// #6 find the longest word within the string
q6 = (s) => {
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
q7 = (s) => {
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
q8 = (num) => {
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
q9 = (input) => typeof input;
console.log(q9(() => {}));

// #10 returns the n rows by n columns identity matrix
q10 = (n) => {
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
q11 = (arr) => {
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
q12 = (num) => {
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
q13 = (num) => {
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
q14 = (num) => {
	let coins = [50, 25, 10, 5, 2, 1];
	let i = 0,
		res = [];
	while (i < coins.length) {
		if (num > coins[i]) {
			res.push(coins[i]);
		} else {
			i++;
		}
	}
	return res;
};
console.log(q14(46));
