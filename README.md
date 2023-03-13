HTML collection
  <main class="container">
    <div class="title">
      <img
        src="https://todos-app-v2.vercel.app/img/note.75134fb0.svg"
        alt=""
        class="title__img"
      />
      <h1 class="title__content">to-do-list</h1>
    </div>
    <div class="form">
      <h2 class="form__title">~ Today I need to ~</h2>
      <form>
        <input type="text" placeholder="Add new todo.." />
        <button type="submit">
          <span>Submit</span>
        </button>
      </form>
    </div>
    <div>
    <div class="search-block">
      <span class="search-block__title">~ Search todo ~</span>
      <div class="search-block__btn-types">
        <div class="filter__item">
          <input
            type="radio"
            class="filter-radio"
            id="1"
          />
          <label for="1" class="filter-label">All</label>
        </div>
        <div class="filter__item">
          <input
            type="radio"
            class="filter-radio"
            id="2"
          />
          <label for="2" class="filter-label">Completed</label>
        </div>
        <div class="filter__item">
          <input
            type="radio"
            class="filter-radio"
            id="3"
          />
          <label for="3" class="filter-label">Active</label>
        </div>
      </div>
    </div>
    <ul class="todo-list">
      <li class="todo completed">
        <div class="checkbox-btn">
          <div class="checkbox-btn__empty"></div>
          <span class="checkbox-btn__icon">+</span>
        </div>
        <span class="todo__content">TEST TODO item</span>
        <button class="todo__deleteBtn">+</button>
      </li>
    </ul>

  </main>