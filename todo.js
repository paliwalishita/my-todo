const addTask = document.querySelector('.add input');
const submitTask = document.querySelector('.add-button');
const task = document.querySelector('.tasks');
const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
let counter = localStorage.getItem("counter") ? JSON.parse(localStorage.getItem("counter")) : 1;

window.onload = render;
    // todo list li template
    function todoTemplate(todo){
        let html = '';
        return html = `<li id ='${todo.id}
    ' class='${todo.completed ? "complete" : ""}
    '>
        <div> ${todo.item}
    </div>
        <button class="delete">x</button>
       </li>` ;
    }