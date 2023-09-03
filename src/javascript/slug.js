const title = document.querySelector(".title");
const input = document.querySelector(".input-root");
const list = document.querySelector(".list-content");
const checkbox = document.querySelector("#checkbox");
let storage = localStorage.getItem("rooms");
let path = window.location.pathname.slice(1);
storage = JSON.parse(storage)
const roomIndex = storage.findIndex(room => room.id === path);


if (storage !== null) {
    if (storage.length !== 0) {
        title.innerHTML = `<p>Lista: ${storage[roomIndex].name}</p>`;
        renderTodos(storage[roomIndex].todos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
    } else {
        window.location.replace('/')
    }
} else {
    window.location.replace('/')
}

input.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        if (input.value.trim() !== "") {
            if (storage !== null) {
                const newTodo = {
                    id: crypto.randomUUID(),
                    todo: input.value.trim(),
                    checked: false,
                    createdAt: new Date().toISOString()
                }
                if (roomIndex !== -1) {
                    storage[roomIndex].todos.push(newTodo);

                   localStorage.setItem("rooms", JSON.stringify(storage));

                    

                    input.value = "";

                    renderTodos(storage[roomIndex].todos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
                }
            }
        }
    } 
});


function renderTodos(todos) {
    list.innerHTML = "";
    todos.forEach((item) => {
        const divElement = document.createElement("div");
        const checkbox = document.createElement("input");
        const paragraph = document.createElement("p");
        const del = document.createElement('del');
        const divDel = document.createElement("div");
        const icon = document.createElement('i');
        const container = document.createElement("div");

        divDel.className = "deletar";
        divElement.className = "item";
        container.className = "container"

        checkbox.type = "checkbox";
        checkbox.checked = item.checked;
        checkbox.id = "checkbox";

        icon.className = "fa fa-trash-o";

        checkbox.addEventListener("change", () => {
            handleCheck(item, checkbox.checked);
        })

        icon.addEventListener('click', () => {
            handleDelete(item);
        })

        paragraph.textContent = item.todo;
        del.textContent = item.todo;

        divDel.appendChild(icon);

        divElement.append(checkbox, item.checked === true ? del : paragraph);
        container.append(divElement, divDel);
        list.appendChild(container);
    })
}

function handleCheck (item, isChecked){

    const todoIndex = storage[roomIndex].todos.findIndex(todo => todo.id === item.id);

    if(todoIndex !== -1){
        storage[roomIndex].todos[todoIndex].checked = isChecked;
        localStorage.setItem("rooms", JSON.stringify(storage));
        renderTodos(storage[roomIndex].todos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
    }
    
}


function handleDelete(item){
    const todoIndex = storage[roomIndex].todos.findIndex(todo => todo.id === item.id);

    if(todoIndex !== -1){
        storage[roomIndex].todos.splice(todoIndex, 1);
        
        localStorage.setItem("rooms", JSON.stringify(storage));

        renderTodos(storage[roomIndex].todos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    }
}