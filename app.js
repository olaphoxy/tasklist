const input = document.getElementById('entry');
const button = document.getElementById('push');
const folder = document.getElementById('list');
const form = document.getElementById('newtask')

// create event listener 
form.addEventListener('submit', addTask);
folder.addEventListener('click', removeTask);
document.addEventListener('DOMContentLoaded', getTasks);




function getTasks(){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))    
    }
    tasks.forEach(function(task){
           // create an li 
           const li = document.createElement('li');
           li.className = 'collection-item task';
           li.appendChild(document.createTextNode(task));
           // create link 
           const link = document.createElement('a');
           link.className = 'delete-item secondary-content';
       
           link.innerHTML = '<i class="fa fa-remove"></i>';
           li.appendChild(link);
           folder.appendChild(li);
       
    })
}


// addTask 
function addTask(e) {
    if(input.value != ''){
        // alert('Add a Task');


        // create an li 
        const li = document.createElement('li');
        li.className = 'collection-item task';
        li.appendChild(document.createTextNode(input.value));
        // create link 
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
    
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        folder.appendChild(li);
    
        // store in LS 
        storeInLS(input.value);
    
        // clear input 
        input.value = '';
    }

    e.preventDefault();
}

// Store Task FIRST THING
function storeInLS(task){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
        
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

// Remove tasks 
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if (confirm('Are you sure')) {
            e.target.parentElement.parentElement.remove();
            // removeTask from LS 
            removeTaskFromLS(e.target.parentElement.parentElement);
        }
       
    }
  
}


// remove from ls 
function removeTaskFromLS(taskItem){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
        
    }
    tasks.forEach(function(task, index){
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

