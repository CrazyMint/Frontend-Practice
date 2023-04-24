const HOST = "server.com/";

// Event

const searchBar = document.getElementsByClassName("search__bar")[0];
const searchInput = document.getElementsByClassName("search__bar__input")[0];
const suggestionsElement = document.getElementsByClassName(
	"search__suggestions__list"
)[0];
const actionsElement = document.getElementsByClassName("search__actions")[0];

const wrapBoldedCharacters = ({ inputValue, suggestion }) => {
	if (suggestion.startsWith(inputValue)) {
		return `${suggestion.substring(
			0,
			inputValue.length
		)}<strong>${suggestion.substring(inputValue.length)}</strong>`;
	}

	return `<strong>${suggestion}</strong>`;
};

const createSuggestionElement = ({ suggestion, auxiliary }) => {
	const auxiliaryElement = auxiliary ? `- ${auxiliary}` : "";
	const boldProcessedSuggestion = wrapBoldedCharacters({
		inputValue: searchInput.value,
		suggestion,
	});
	return `<li class="search__suggestions__list__result">${boldProcessedSuggestion}${auxiliaryElement}</li>`;
};

const onSuggestionsResponse = (data) => {
	let suggestionsHTML = "";
	for (let item of data) {
		suggestionsHTML += createSuggestionElement(item);
	}
	suggestionsElement.innerHTML = suggestionsHTML;
	if (suggestionsHTML) {
		actionsElement.classList.add("search__actions--autosuggest");
		actionsElement.classList.add("search__autosuggest");
		searchBar.classList.add("search__bar--autosuggest");
	} else {
		actionsElement.classList.remove("search__actions--autosuggest");
		actionsElement.classList.remove("search__autosuggest");
		searchBar.classList.remove("search__bar--autosuggest");
	}
};

const onNewInput = () => {
	if (searchInput.value) {
		api.get(HOST + "autocomplete", searchInput.value, onSuggestionsResponse);
	} else {
		suggestionsElement.innerHTML = "";
		actionsElement.classList.remove("search__actions--autosuggest");
		actionsElement.classList.remove("search__autosuggest");
		searchBar.classList.remove("search__bar--autosuggest");
	}
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
