// // slectsors 
const todoinouts = document.querySelector(".todoinputs");
const todobution = document.querySelector(".todo-boton");
const todoliste = document.querySelector(".todolistes");
const filtersObshan = document.querySelector(".filters-todos");


// add events
todobution.addEventListener("click", addtodo);
todoliste.addEventListener("click", checkremove);
filtersObshan.addEventListener("click", filtersTodos);
document.addEventListener("DOMContentLoaded", getlocalTodos);


// funtion addd
function addtodo(e) {
    e.preventDefault();
    // console.log(e);
    // get todo value
    // cret new todo 
    // add to DOM 
    // reset input
    const tododiv = document.createElement("div");
    tododiv.classList.add('todo');
    const newtodo = ` 
    <li>${todoinouts.value}</li>
    <span><i class="fa-solid fa-square-check"></i></span>
    <span><i class="fa-solid fa-trash-can"></i></span>
`
    tododiv.innerHTML = newtodo;
    todoliste.appendChild(tododiv);
    sevelocalTodos(todoinouts.value);
    todoinouts.value = '';
}

// to funtion check dlets
function checkremove(e) {
    const classlites = [...e.target.classList];
    const items = e.target;
    // console.log(items.parentElement.parentElement );
    if (classlites[1] === 'fa-square-check') {
        const todo = items.parentElement.parentElement;
        todo.classList.toggle('competed');
    } else if (classlites[1] === 'fa-trash-can') {
        const todo = items.parentElement.parentElement;
        removerlocaltods(todo);
        todo.remove();
    }

};


// to obshecnts
function filtersTodos(e) {
    // console.log(e.target.value);
    // console.log(todoliste.childNodes);
    const todos = [...todoliste.childNodes];
    todos.forEach((ali) => {
        switch (e.target.value) {
            case "all":
                ali.display = "flex";
                break;

            case "complets":
                if (ali.classList.contains("competed")) {
                    ali.style.display = "flex";
                } else {
                    ali.style.display = "none";
                };
                break;

            case "undefids":
                if (!ali.classList.contains("competed")) {
                    ali.style.display = "flex";
                } else {
                    ali.style.display = "none";
                };
                break;

        }
    });
}

function sevelocalTodos(todo) {

    let sevedTodos = localStorage.getItem('todos') ?
        JSON.parse(localStorage.getItem('todos'))
        : [];

    sevedTodos.push(todo);
    localStorage.setItem('todos', JSON.stringify(sevedTodos));
}

function getlocalTodos(todo) {

    let sevedTodos = localStorage.getItem('todos')
        ? JSON.parse(localStorage.getItem('todos'))
        : [];

    sevedTodos.forEach((todo) => {
        const tododiv = document.createElement("div");
        tododiv.classList.add('todo');
        const newtodo = ` 
        <li>${todo}</li>
        <span><i class="fa-solid fa-square-check"></i></span>
        <span><i class="fa-solid fa-trash-can"></i></span>
    `
        tododiv.innerHTML = newtodo;
        todoliste.appendChild(tododiv);
    });
};


function removerlocaltods(todo) {
    // console.log(todo.children[0].innerText);

    let sevedTodos = localStorage.getItem('todos') ?
        JSON.parse(localStorage.getItem('todos'))
        : [];

    const filterstodos = sevedTodos.filter(t => t !== todo.children[0].innerText);
    localStorage.setItem('todos', JSON.stringify(filterstodos));
}

