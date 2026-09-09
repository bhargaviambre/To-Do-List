let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const input = document.querySelector(".todo-input input");
const addButton = document.querySelector(".todo-input button");
const taskList = document.querySelector(".task-list");

    function saveTasks(){
        localStorage.setItem("tasks",JSON.stringify(tasks));
    }

    function addTask(task){
    const li = document.createElement("li");
    if(task.completed){
        li.classList.add("completed");
    }

    li.innerHTML = `
    <span class="task-text">${task.text}</span>
    <button class="delete-btn">Delete</button>
    `;

    li.querySelector(".task-text").onclick = function(){
        task.completed=!task.completed;
        li.classList.toggle("completed");
        saveTasks();
    };

    li.querySelector(".delete-btn").onclick = function(){
        const index = tasks.indexOf(task);
        tasks.splice(index,1);   
        saveTasks();
        li.remove();
    };

    taskList.appendChild(li);
    }


    addButton.onclick = function(){
    const task = input.value.trim();
    if(task === ""){
        return;
    }
    const newTask = {
        text:task,
        completed:false
    };
    tasks.push(newTask);
    saveTasks();
    addTask(newTask);
    input.value="";
};
tasks.forEach(addTask);

input.addEventListener("keypress",function(event){
    if(event.key === "Enter"){
        addButton.click();
    }
});