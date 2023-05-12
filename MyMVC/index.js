const API = (() => {
	const URL = "http://localhost:3000/todos";

	const getTodos = () => fetch(URL).then((data) => data.json());

	const postTodo = (todo) => {
		console.log("post called");
		return fetch(URL, {
			method: "POST",
			body: JSON.stringify(todo),
			headers: { "Content-Type": "application/json" },
		})
			.then((data) => data.json())
			.catch((err) => console.log(err));
	};

	const deleteTodo = (id) => {
		console.log("delete called");
		return fetch(URL + "/" + id, { method: "DELETE" }).then((data) =>
			data.json()
		);
	};

	return { getTodos, postTodo, deleteTodo };
})();
// API.postTodo({ name: "austin" }).then((data) => console.log(data));
const Model = (() => {
	class State {
		#todos;
		#onChange; // save a callback
		constructor() {
			this.#todos = [];
		}
		get todos() {
			return this.#todos;
		}
		set todos(newTodos) {
			this.#todos = newTodos;
			// call the render function every time #todos is modified
			this.#onChange();
		}
		subscribe(callback) {
			this.#onChange = callback;
		}
	}
	const { getTodos, postTodo, deleteTodo } = API;
	return {
		State,
		getTodos,
		postTodo,
		deleteTodo,
	};
})();

const View = (() => {
	const inputEl = document.querySelector(".todo-input");
	const todoListEl = document.querySelector(".todolist-container ul");
	const submitBtn = document.querySelector(".submit-btn");
	const deleteBtnEls = document.querySelectorAll(".delete-btn");

	const getInputValue = () => inputEl.value;

	const renderTodoList = (todos) => {
		let curTodoList = "";
		todos.forEach((todo) => {
			const li = `<li todo-id=${todo.id}><span>${todo.content}</span><button class='delete-btn'>remove</button></li>`;
			curTodoList += li;
		});
		todoListEl.innerHTML = curTodoList;
	};

	const clearInput = () => {
		inputEl.value = "";
	};

	return {
		submitBtn,
		inputEl,
		todoListEl,
		deleteBtnEls,
		getInputValue,
		renderTodoList,
		clearInput,
	};
})();

const Controller = ((model, view) => {
	const state = new model.State();

	const handleSubmit = () => {
		view.submitBtn.addEventListener("click", (event) => {
			event.preventDefault();
			console.log("handle submit");
			const value = view.getInputValue();
			const todoObj = { content: value };
			model.postTodo(todoObj).then((newTodo) => {
				state.todos = [newTodo, ...state.todos];
				view.clearInput();
			});
		});
	};

	const handleRemove = () => {
		view.todoListEl.addEventListener("click", (event) => {
			event.preventDefault();
			if (event.target.className !== "delete-btn") {
				return;
			}
			const id = event.target.parentNode.getAttribute("todo-id");
			model.deleteTodo(id).then(() => {
				state.todos = state.todos.filter((todo) => todo["id"] !== +id);
			});
		});
	};

	const init = () => {
		model.getTodos().then((todos) => {
			todos.reverse();
			state.todos = todos;
		});
	};

	const bootstrap = () => {
		handleSubmit();
		handleRemove();
		init();
		state.subscribe(() => view.renderTodoList(state.todos));
	};

	return { bootstrap };
})(Model, View);

Controller.bootstrap();
