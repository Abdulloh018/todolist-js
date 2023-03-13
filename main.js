// Document Object Modul
const createTodoInput = document.querySelector(".create-todo-input");
const createTodoBtn = document.querySelector(".create-todo-btn");
const todoList = document.querySelector(".todo-list");
const checkboxBtn = document.querySelector(".checkbox-btn__empty");
const checkboxBtnIcon = document.querySelector(".checkbox-btn__icon");
const sortButtons = document.querySelectorAll("[data-sort-by]");

const todoItems = JSON.parse(localStorage.getItem("database"));
if (!todoItems) {
  localStorage.setItem("database", JSON.stringify([]));
}

const savedSortOption = JSON.parse(localStorage.getItem("sort_by"));
if (savedSortOption) {
  if (savedSortOption === "all") {
    renderTodo(todoItems);
  } else if (savedSortOption === "completed") {
    const filtered = todoItems.filter((todo) => todo.completed);
    renderTodo(filtered);
  } else {
    const filtered = todoItems.filter((todo) => !todo.completed);
    renderTodo(filtered);
  }
} else {
  localStorage.setItem("sort_by", JSON.stringify("all"));
  renderTodo(todoItems);
}

sortButtons.forEach((item) => {
  if (
    item.getAttribute("data-sort-by") ===
    JSON.parse(localStorage.getItem("sort_by"))
  ) {
    item.children[0].setAttribute("checked", true);
  }
});

sortButtons.forEach((item) => {
  item.addEventListener("click", () => {
    const todos = JSON.parse(localStorage.getItem("database"));
    const sortOption = item.getAttribute("data-sort-by");
    if (sortOption === "all") {
      localStorage.setItem("sort_by", JSON.stringify("all"));
      renderTodo(todos);
    } else if (sortOption === "completed") {
      localStorage.setItem("sort_by", JSON.stringify("completed"));
      const filtered = todos.filter((todo) => todo.completed);
      renderTodo(filtered);
    } else {
      localStorage.setItem("sort_by", JSON.stringify("active"));
      const filtered = todos.filter((todo) => !todo.completed);
      renderTodo(filtered);
    }
    console.log(sortOption, todos);
  });
});

createTodoBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const inputValue = createTodoInput.value;

  const todo = {
    title: inputValue,
    completed: false,
  };

  const todoItems = JSON.parse(localStorage.getItem("database"));
  if (inputValue) {
    if (todoItems.length) {
      todoItems.push(todo);
      localStorage.setItem("database", JSON.stringify(todoItems));
      renderTodo(todoItems);
    } else {
      localStorage.setItem("database", JSON.stringify([todo]));
      renderTodo([todo]);
    }
  }
  createTodoInput.value = "";
});

function renderTodo(database) {
  todoList.innerHTML = "";
  database.forEach((item) => {
    const todoItem = document.createElement("li");
    if (item.completed) {
      todoItem.classList.add("completed");
    }
    todoItem.classList.add("todo");
    console.log(item);

    const completeChangeBtn = document.createElement("div");
    completeChangeBtn.classList.add("checkbox-btn");
    todoItem.insertAdjacentElement("beforeend", completeChangeBtn);

    const completeChangeActiveBtn = document.createElement("div");
    if (item.completed) {
      completeChangeActiveBtn.style.display = "none";
    }
    completeChangeActiveBtn.classList.add("checkbox-btn__empty");
    completeChangeBtn.insertAdjacentElement(
      "beforeend",
      completeChangeActiveBtn
    );
    completeChangeActiveBtn.addEventListener("click", () => {
      const todos = JSON.parse(localStorage.getItem("database"));
      const activeTodo = todos.find((todo) => todo.title === item.title);
      activeTodo.completed = true;
      localStorage.setItem("database", JSON.stringify(todos));

      const sortOption = JSON.parse(localStorage.getItem("sort_by"));
      if (sortOption === "all") {
        renderTodo(todos);
      } else if (sortOption === "completed") {
        const filtered = todos.filter((todo) => todo.completed);
        renderTodo(filtered);
      } else {
        const filtered = todos.filter((todo) => !todo.completed);
        renderTodo(filtered);
      }
    });

    const completeChangeCompleteBtn = document.createElement("span");
    if (item.completed) {
      completeChangeCompleteBtn.style.display = "block";
    }
    completeChangeCompleteBtn.classList.add("checkbox-btn__icon");
    completeChangeBtn.insertAdjacentElement(
      "beforeend",
      completeChangeCompleteBtn
    );
    completeChangeCompleteBtn.innerText = "+";

    completeChangeCompleteBtn.addEventListener("click", () => {
      const todos = JSON.parse(localStorage.getItem("database"));
      const activeTodo = todos.find((todo) => todo.title === item.title);
      activeTodo.completed = false;
      localStorage.setItem("database", JSON.stringify(todos));

      const sortOption = JSON.parse(localStorage.getItem("sort_by"));
      if (sortOption === "all") {
        renderTodo(todos);
      } else if (sortOption === "completed") {
        const filtered = todos.filter((todo) => todo.completed);
        renderTodo(filtered);
      } else {
        const filtered = todos.filter((todo) => !todo.completed);
        renderTodo(filtered);
      }
    });

    const todoContent = document.createElement("span");
    todoContent.classList.add("todo__content");
    todoItem.insertAdjacentElement("beforeend", todoContent);

    todoContent.innerText = item.title;

    const todoDeleteBtn = document.createElement("button");
    todoDeleteBtn.classList.add("todo__deleteBtn");
    todoItem.insertAdjacentElement("beforeend", todoDeleteBtn);

    todoDeleteBtn.addEventListener("click", () => {
      const todos = JSON.parse(localStorage.getItem("database"));
      const index = todos.findIndex((todo) => todo.title === item.title);
      if (index > -1) {
        todos.splice(index, 1);
      }
      localStorage.setItem("database", JSON.stringify(todos));

      
      const sortOption = JSON.parse(localStorage.getItem("sort_by"));
      if (sortOption === "all") {
        renderTodo(todos);
      } else if (sortOption === "completed") {
        const filtered = todos.filter((todo) => todo.completed);
        renderTodo(filtered);
      } else {
        const filtered = todos.filter((todo) => !todo.completed);
        renderTodo(filtered);
      }
    });

    todoDeleteBtn.innerText = "+";

    todoList.insertAdjacentElement("beforeend", todoItem);
  });
}
