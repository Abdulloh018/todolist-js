// Document Object Modul
const createTodoInput = document.querySelector(".create-todo-input");
const createTodoBtn = document.querySelector(".create-todo-btn");
const todoList = document.querySelector(".todo-list");
const checkboxBtn = document.querySelector(".checkbox-btn__empty");
const checkboxBtnIcon = document.querySelector(".checkbox-btn__icon");
const sortButtons = document.querySelectorAll("[data-sort-by]");

const toggleData = function (key, value) {
  if (value) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    return JSON.parse(localStorage.getItem(key));
  }
};

const todoItems = toggleData('database')
if (!todoItems) {
  toggleData('database', [])
}
console.log(todoItems, 'asdf');
const savedSortOption = toggleData('sort_by')
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
  toggleData('sort_by', 'all')
  renderTodo(todoItems);
}

sortButtons.forEach((item) => {
  if (
    item.getAttribute("data-sort-by") ===
    savedSortOption
  ) {
    item.children[0].setAttribute("checked", true);
  }
});

sortButtons.forEach((item) => {
  item.addEventListener("click", () => {
    const todos = toggleData('database')
    const sortOption = item.getAttribute("data-sort-by");
    if (sortOption === "all") {
      toggleData('sort_by', 'all')
      renderTodo(todos);
    } else if (sortOption === "completed") {
      toggleData('sort_by', "completed")
      const filtered = todos.filter((todo) => todo.completed);
      renderTodo(filtered);
    } else {
      toggleData('sort_by', 'active')
      const filtered = todos.filter((todo) => !todo.completed);
      renderTodo(filtered);
    }
  });
});

createTodoBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const inputValue = createTodoInput.value;

  const todo = {
    title: inputValue,
    completed: false,
  };

  const todoItems = toggleData('database')
  if (inputValue) {
    if (todoItems.length) {
      todoItems.push(todo);
      toggleData('database', todoItems)
      renderSorts(todoItems);
    } else {
      toggleData('database', [todo]);
      renderTodo([todo]);
    }
  }
  createTodoInput.value = "";
});

const renderSorts = function (todos) {
  const sortOption = toggleData('sort_by')
  if (sortOption === "all") {
    renderTodo(todos);
  } else if (sortOption === "completed") {
    const filtered = todos.filter((todo) => todo.completed);
    renderTodo(filtered);
  } else {
    const filtered = todos.filter((todo) => !todo.completed);
    renderTodo(filtered);
  }
};

function renderTodo(database) {
  todoList.innerHTML = "";
  database.forEach((item) => {
    const todoItem = document.createElement("li");
    if (item.completed) {
      todoItem.classList.add("completed");
    }
    todoItem.classList.add("todo");

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
      const todos = toggleData('database')
      const activeTodo = todos.find((todo) => todo.title === item.title);
      activeTodo.completed = true;
      toggleData('database', todos)

      renderSorts(todos);
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
      const todos = toggleData('database')
      const activeTodo = todos.find((todo) => todo.title === item.title);
      activeTodo.completed = false;
      localStorage.setItem("database", JSON.stringify(todos));

      renderSorts(todos);
    });

    const todoContent = document.createElement("span");
    todoContent.classList.add("todo__content");
    todoItem.insertAdjacentElement("beforeend", todoContent);

    todoContent.innerText = item.title;

    const todoDeleteBtn = document.createElement("button");
    todoDeleteBtn.classList.add("todo__deleteBtn");
    todoItem.insertAdjacentElement("beforeend", todoDeleteBtn);

    todoDeleteBtn.addEventListener("click", () => {
      const todos = toggleData('database')
      console.log(todos, todoItems);
      const index = todos.findIndex((todo) => todo.title === item.title);
      if (index > -1) {
        todos.splice(index, 1);
      }
      localStorage.setItem("database", JSON.stringify(todos));

      renderSorts(todos);
    });

    todoDeleteBtn.innerText = "+";

    todoList.insertAdjacentElement("beforeend", todoItem);
  });
}
