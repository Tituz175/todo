const todo = document.querySelector("#todo");
const addForm = document.querySelector(".add");
const todoList = document.querySelector(".todos");
const searchForm = document.querySelector(".search input");

class Todo {
  constructor(element) {
    this.element = element;
    this.addForm = document.querySelector(`.add`);
    this.todoList = document.querySelector(".todos");
    this.searchForm = document.querySelector(".search input");
    this.todoArr = [];
  }
  init() {
    this.addForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (addForm.add.value.trim() != "") {
        this.storeTodos(addForm.add.value.trim());
        addForm.reset();
      }
    });
    this.todoList.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete")) {
        this.removeTodos(e.target.previousElementSibling.innerHTML);
      }
    });
    this.searchForm.addEventListener("keyup", (e) => {
      const term = searchForm.value.trim().toLowerCase();
      this.filterTodos(term);
    });
    this.getTodos();
  }
  storeTodos(todo) {
    this.todoArr = JSON.parse(localStorage.getItem("todos"));
    if (!JSON.parse(localStorage.getItem("todos"))) {
      this.todoArr = [];
    }
    // this.todoArr = JSON.parse(localStorage.getItem("todos"));
    this.todoArr.push(todo);
    localStorage.setItem("todos", JSON.stringify(this.todoArr));
    this.getTodos();
  }
  getTodos() {
    if (JSON.parse(localStorage.getItem("todos"))) {
      this.todoList.innerHTML = "";
      JSON.parse(localStorage.getItem("todos")).forEach((todo) => {
        const html = `
      <li class="flex justify-between items-center my-0.5 px-3 md:px-6 py-3 md:py-4 md:text-xl font-normal md:font-semibold rounded-md">
            <span>${todo}</span>
            <span class="delete">🗑️</span>
      </li>
      `;
        this.todoList.innerHTML += html;
      });
    }
  }
  removeTodos(item) {
    console.log(JSON.parse(localStorage.getItem("todos")));
    const filteredTodos = JSON.parse(localStorage.getItem("todos")).filter(
      (todo) => todo != item
    );
    console.log(filteredTodos);
    localStorage.setItem("todos", JSON.stringify(filteredTodos));
    this.searchForm.value = "";
    this.getTodos();
  }
  filterTodos(term) {
    Array.from(todoList.children)
      .filter((todo) => !todo.textContent.toLowerCase().includes(term))
      .forEach((todo) => todo.classList.add("hidden"));

    Array.from(todoList.children)
      .filter((todo) => todo.textContent.toLowerCase().includes(term))
      .forEach((todo) => todo.classList.remove("hidden"));
  }
}

const todoObj = new Todo(todo);
todoObj.init();

// addForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const generateTemplate = (todo) => {
//     const html = `
//       <li class="flex justify-between items-center my-0.5 px-6 py-4 text-xl font-semibold rounded-sm">
//             <span>${todo}</span>
//             <span class="far fa-trash-alt delete">🗑️</span>
//       </li>
//       `;
//     todoList.innerHTML += html;
//   };

//   const todo = addForm.add.value.trim();
//   if (todo !== "") {
//     generateTemplate(todo);
//     addForm.reset();
//   }
//   addForm.add.value = "";
// });

// todoList.addEventListener("click", (e) => {
//   if (e.target.classList.contains("delete")) {
//     e.target.parentElement.remove();
//   }
// });

// const filterTodos = (term) => {
//   Array.from(todoList.children)
//     .filter((todo) => !todo.textContent.toLowerCase().includes(term))
//     .forEach((todo) => todo.classList.add("hidden"));

//   Array.from(todoList.children)
//     .filter((todo) => todo.textContent.toLowerCase().includes(term))
//     .forEach((todo) => todo.classList.remove("hidden"));
// };

// searchForm.addEventListener("keyup", (e) => {
//   const term = searchForm.value.trim().toLowerCase();
//   filterTodos(term);
// });
