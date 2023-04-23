const HOST = "server.com/";

// Event

const searchInput = document.getElementsByClassName("search__bar__input")[0];

const createSuggestionElement = ({ suggestion, auxiliary }) => {
	const auxiliaryElement = auxiliary ? `- ${auxiliary}` : "";
	return `<li class="search__suggestions__list__result">${suggestion}${auxiliaryElement}</li>`;
};

const onSuggestionsResponse = (data) => {
	const suggestionsElement = document.getElementsByClassName(
		"search__suggestions__list"
	)[0];

	let suggestionsHTML = "";
	for (let item of data) {
		suggestionsHTML += createSuggestionElement(item);
	}
	suggestionsElement.innerHTML = suggestionsHTML;
};

const onNewInput = () => {
	api.get(HOST + "autocomplete", searchInput.value, onSuggestionsResponse);
};

searchInput.oninput = onNewInput;

// Server

const getRandomString = ({ length }) => {
	let result = "";
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}
	return result;
};
// console.log(getRandomString({ length: 10 }));

const getRandomInteger = ({ min, max }) =>
	Math.floor(Math.random() * (max - min) + min);
// console.log(getRandomInteger({ min: 1, max: 10 }));

const generateSuggestion = (prefix) => {
	const EXACT_MATCH_RATIO = 0.3;
	const AUTOCORRECT_RATIO = 0.1;

	if (Math.random() < EXACT_MATCH_RATIO) {
		return prefix;
	}

	if (Math.random() < AUTOCORRECT_RATIO) {
		return getRandomString({
			length: getRandomInteger({ min: 1, max: prefix.length }),
		});
	}

	return (
		prefix + getRandomString({ length: getRandomInteger({ min: 1, max: 10 }) })
	);
};

const getAutocompleteHandler = (data) => {
	const MAX_CHARS = 10;
	const NUM_AUTOCOMPLETE_RESULTS = 10;
	const RATIO_AUXILIARY_DATA = 0.1;

	if (data.length > MAX_CHARS) {
		return [];
	}

	const results = [];
	while (results.length < NUM_AUTOCOMPLETE_RESULTS) {
		const suggestion = generateSuggestion(data);

		if (results.find((result) => result.suggestion === suggestion)) {
			continue;
		}

		if (Math.random() < RATIO_AUXILIARY_DATA) {
			for (let i = 0; i < 2; i++) {
				results.push({
					suggestion,
					auxiliary: getRandomString({
						length: getRandomInteger({ min: 5, max: 15 }),
					}),
				});
			}
		} else {
			results.push({ suggestion, auxiliary: "" });
		}
	}

	return results;
};

const endpoints = {
	"/": {
		get: () => "hello world",
	},
	"/autocomplete": {
		get: getAutocompleteHandler,
	},
};

// API library

const getFunction = (url, data, callback) => {
	const domain = url.substring(0, url.indexOf("/"));
	const endpoint = url.substring(url.indexOf("/"));

	callback(endpoints[endpoint].get(data));
};

const postFunction = () => {};

const api = {
	get: getFunction,
	post: postFunction,
};
