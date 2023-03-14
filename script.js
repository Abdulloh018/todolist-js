// Document Object Modul
const createTodoInput = document.querySelector(".create-todo-input");
const createTodoBtn = document.querySelector(".create-todo-btn");
const todoList = document.querySelector(".todo-list");
const checkboxBtn = document.querySelector(".checkbox-btn__empty");
const checkboxBtnIcon = document.querySelector(".checkbox-btn__icon");
const sortButtons = document.querySelectorAll("[data-sort-by]");

const API_URL = "https://64107fb8c3639725adb7ab0f.mockapi.io/api/todos";

const getTodos = async function () {
  try {
    const req = await fetch(API_URL);
    return await req.json();
  } catch (error) {
    console.log(error);
  }
};

const createTodo = async function (todo) {
  try {
    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteTodo = async function (id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
};

const updateTodo = async function (todo) {
  try {
    await fetch(`${API_URL}/${todo.id}`, {
      method: "PUT",
      body: JSON.stringify(todo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getSortedTodos = async function () {
  const todos = await getTodos();
  const option = toggleData("sort_by");
  if (option === "all") {
    return await todos;
  } else if (option === "completed") {
    return await todos.filter((todo) => todo.completed);
  } else {
    return await todos.filter((todo) => !todo.completed);
  }
};

function toggleData(key, value) {
  if (value) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    return JSON.parse(localStorage.getItem(key));
  }
}

const savedSortOption = toggleData("sort_by");
if (savedSortOption) {
  renderTodo();
} else {
  toggleData("sort_by", "all");
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
    const sortOption = item.getAttribute("data-sort-by");
    if (sortOption === "all") {
      toggleData("sort_by", "all");
      renderTodo()
    } else if (sortOption === "completed") {
      toggleData("sort_by", "completed");
      renderTodo()
    } else {
      toggleData("sort_by", "active");
      renderTodo()
    }
  });
});

createTodoBtn.addEventListener("click", async function (e) {
  e.preventDefault();

  const inputValue = createTodoInput.value;

  const todo = {
    name: inputValue,
    completed: false,
  };

  await createTodo(todo);

  renderTodo();

  createTodoInput.value = "";
});

async function renderTodo() {
  const todos = await getSortedTodos();
  todoList.innerHTML = "";
  await todos.forEach((item) => {
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
    completeChangeActiveBtn.addEventListener("click", async () => {
      const requestData = { ...item };
      requestData.completed = true;
      console.log(item, requestData);
      await updateTodo(requestData);
      renderTodo();
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

    completeChangeCompleteBtn.addEventListener("click", async () => {
      const requestData = { ...item };
      requestData.completed = false;
      console.log(item, requestData);
      await updateTodo(requestData);
      renderTodo();
    });

    const todoContent = document.createElement("span");
    todoContent.classList.add("todo__content");
    todoItem.insertAdjacentElement("beforeend", todoContent);

    todoContent.innerText = item.name;

    const todoDeleteBtn = document.createElement("button");
    todoDeleteBtn.classList.add("todo__deleteBtn");
    todoItem.insertAdjacentElement("beforeend", todoDeleteBtn);

    todoDeleteBtn.addEventListener("click", async () => {
      await deleteTodo(item.id);

      renderTodo();
    });

    todoDeleteBtn.innerText = "+";

    todoList.insertAdjacentElement("beforeend", todoItem);
  });
}
