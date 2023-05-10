function myFetch(url, options) {
	return new Promise((resolve, reject) => {
		const { method, body = null, headers = null } = options;

		var xhttp = new XMLHttpRequest();
		xhttp.onload = () => {
			if (xhttp.status >= 200 && xhttp.status < 400) {
				resolve(xhttp.response);
			} else {
				reject(new Error("Request failed: " + xhttp.status));
			}
		};
		xhttp.onerror = () => {
			reject(new Error("Encountered an error: " + xhttp.status));
		};

		xhttp.open(method, url);
		if (headers) {
			for (let item of Object.entries(options.headers)) {
				xhttp.setRequestHeader(item[0], item[1]);
			}
		}

		if (method == "GET" || method == "DELETE") {
			xhttp.send();
		} else if (method == "PUT" || method == "POST") {
			if (body) {
				xhttp.send(JSON.stringify(body));
			} else {
				reject(new Error("Must give a body for PUT or POST method. "));
			}
		}
	});
}

// fetch("https://jsonplaceholder.typicode.com/todos/1").then((res) =>
//   console.log(res.status)
// );
const body = { name: "Austin", age: 25 };

myFetch("https://jsonplaceholder.typicode.com/todos/1", {
	method: "GET",
})
	.then((res) => console.log("Get: ", res))
	.catch((rej) => console.log(rej));

myFetch("https://jsonplaceholder.typicode.com/posts", {
	method: "POST",
	body,
	headers: {
		"Content-Type": "application/json",
	},
})
	.then((res) => console.log("POST: ", res))
	.catch((rej) => console.log(rej));

myFetch("https://jsonplaceholder.typicode.com/posts/1", {
	method: "PUT",
	body,
	headers: {
		"Content-Type": "application/json",
	},
})
	.then((res) => console.log("PUT: ", res))
	.catch((rej) => console.log(rej));

myFetch("https://jsonplaceholder.typicode.com/posts/1", {
	method: "DELETE",
})
	.then((res) => console.log("DELETE: ", res))
	.catch((rej) => console.log(rej));
