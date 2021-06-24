
//prevent default to make drop work
document.addEventListener("dragover", function(event) {
    event.preventDefault();
});
let item;
let destination;
let dragableArea = [...document.querySelectorAll(".content")];
dragableArea.forEach(element => {
    element.addEventListener("drop", function(ev) {
        destination.appendChild(item);
    });
    element.addEventListener("dragenter", function(ev) {
        destination = ev.target;
    })
});
let dragableItem = [...document.querySelectorAll(".task")];
dragableItem.forEach(element => {
    element.addEventListener("dragstart", function(ev) {
        item = ev.target;
    })
});
let taskList = document.querySelector(".rightCol");
taskList.addEventListener("dragenter", function(ev) {
    destination = ev.target;
});
taskList.addEventListener("drop", function(ev) {
    let emptyLi = [...document.querySelectorAll(".rightCol > ul > li")];
    emptyLi.forEach(item => {
        console.log()
       if (item.innerHTML.trim() == '') {
           item.remove();
       }
    });
    let li = document.createElement("li");
    li.classList.add("row-task");
    li.appendChild(item);
    destination.appendChild(li);
});