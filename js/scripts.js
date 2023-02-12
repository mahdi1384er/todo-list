const myinputs = document.querySelector(".todoinputs"); // sletc my input
const myulTodos = document.querySelector(".todolistes"); // sletc my ul conter
const filtesBox = document.querySelector(".filters-todos");

myulTodos.addEventListener("click", checkremove);
filtesBox.addEventListener("click", shoFiltes);
document.addEventListener("DOMContentLoaded", getdetas);

// to submite value input
function addTODO(e) {
  const inputs = myinputs;
  const cretsDiv = document.createElement("div");
  cretsDiv.classList.add("todo");

  const showmyDiv = ` 
         <li>${inputs.value}</li>
         <span><i class="fa-solid fa-square-check"></i></span>
         <span><i class="fa-solid fa-trash-can"></i></span>
     `;

  cretsDiv.innerHTML = showmyDiv;
  myulTodos.appendChild(cretsDiv);
  notrefrech(inputs.value);
  inputs.value = "";
}

// to check and dlets and opacity box TODO
function checkremove(e) {
  const aryychekTODO = [...e.target.classList];
  const items = e.target;

  if (aryychekTODO[1] === "fa-square-check") {
    const todo = items.parentElement.parentElement;
    todo.classList.toggle("competed");
  } else if (aryychekTODO[1] === "fa-trash-can") {
    const todo = items.parentElement.parentElement;
    removeLocalTodos(todo);
    todo.remove();
  }
}

function shoFiltes(e) {
  const childsFiltes = [...myulTodos.childNodes];

  childsFiltes.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;

      case "complets":
        if (todo.classList.contains("competed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      case "undefids":
        if (!todo.classList.contains("competed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function notrefrech(items) {
  let lokal = localStorage.getItem("todo")
    ? JSON.parse(localStorage.getItem("todo"))
    : [];

  lokal.push(items);

  localStorage.setItem("todo", JSON.stringify(lokal));
}

function getdetas(items) {
  let lokal = localStorage.getItem("todo")
    ? JSON.parse(localStorage.getItem("todo"))
    : [];

  lokal.forEach((todo) => {
    const inputs = myinputs;
    const cretsDiv = document.createElement("div");
    cretsDiv.classList.add("todo");

    const showmyDiv = ` 
             <li>${todo}</li>
             <span><i class="fa-solid fa-square-check"></i></span>
             <span><i class="fa-solid fa-trash-can"></i></span>
         `;

    cretsDiv.innerHTML = showmyDiv;
    myulTodos.appendChild(cretsDiv);
  });
}

function removeLocalTodos(todo) {
  let lokal = localStorage.getItem("todo")
    ? JSON.parse(localStorage.getItem("todo"))
    : [];

  const filterstodos = lokal.filter((t) => t !== todo.children[0].innerText);
  localStorage.setItem("todos", JSON.stringify(filterstodos));
}
