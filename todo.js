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
    

    
    // display completed task from local storage
    function completedTask(id){
        console.log(id, itemsArray)
        const index = itemsArray.findIndex(e => e.id === +id);

        if (index !== -1) {
        itemsArray[index].completed = !(itemsArray[index].completed)
        localStorage.setItem("items", JSON.stringify(itemsArray));
        }
    
 }

     //keyup event filter li 
    function filterTodos(term){
    Array.from(task.children)
    .filter( item => !item.textContent.includes(term))
    .forEach( item => item.classList.add('filtered'));

    Array.from(task.children)
    .filter( item => item.textContent.includes(term))
    .forEach( item => item.classList.remove('filtered'));
}

     // add items to local storage
     function createItemList(todo) {
        let dataObj = {
        item: todo,
        id: counter,
        completed: false
    }
    
    itemsArray.push(dataObj);
    localStorage.setItem("items", JSON.stringify(itemsArray));
    localStorage.setItem("counter", JSON.stringify(++counter));
    render();
}

//get data from local RENDER function
     function render() {
    let data = '';

    if (itemsArray) {
        for (item of itemsArray) {
            data += todoTemplate(item);
        }
        task.innerHTML = data;
    }

}

// delete items from local storage
    function deleteListItem(i){
    itemsArray.splice(i, 1);
    localStorage.setItem("items", JSON.stringify(itemsArray));
    render();
}

    submitTask.addEventListener('click', e => {
        e.preventDefault();
        let todo = addTask.value.trim();
        console.log(todo)
        addTask.value = '';
        if (todo == '') {
            alert("Please enter a task");
        }
     else {
            task.innerHTML += todoTemplate(todo);
            createItemList(todo);
        }
    
    }
);


//delete item from list
task.addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
        const index = Array.from(e.target.parentElement).indexOf(e.target.parentElement) - 1;
        deleteListItem(index);
        e.target.parentElement.remove();
    }

});
// toggle complete class
task.addEventListener('click', e => {

    if (e.target.tagName === 'LI') {
         e.target.classList.toggle('complete');
        completedTask(e.target.id);
    }

});
//filtered list
addTask.addEventListener('keyup', e => {
    let term = addTask.value.trim();
    filterTodos(term);
});
