const button = document.getElementById("button");
const input = document.getElementById("name");
const menu = document.getElementById("menu");
const close = document.querySelector(".fa-close");
const list = document.querySelector(".list-content");
let todos = localStorage.getItem('rooms');
todos = JSON.parse(todos);

button.addEventListener('click', () =>{
    gerarRoom()
})

menu.addEventListener('click', () => {
    const drawner = document.querySelector(".drawner");

    drawner.className = "drawner open"
})

close.addEventListener('click', () => {
    const drawner = document.querySelector(".drawner");

    drawner.className = "drawner close"
})

todos.forEach((item) => {
    const aElement = document.createElement("a");

    aElement.innerHTML = item.name;
    aElement.href = `/${item.id}`;

    list.appendChild(aElement);
})

function gerarRoom(){
    const uid = crypto.randomUUID();
    if(input.value !== ""){
        let storage = localStorage.getItem("rooms");

       if(storage){
            storage = JSON.parse(storage);

            storage.push({
                id: uid, 
                name: input.value,
                todos: []
            })

            localStorage.setItem("rooms", JSON.stringify(storage));

       }else{
        localStorage.setItem("rooms", JSON.stringify(
            [{
                id: uid,
                name: input.value,
                todos: []
            }]
        ))
       }
        input.value = ""
        window.location.href = `/${uid}`
    }
    
}