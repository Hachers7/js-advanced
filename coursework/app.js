var server = "https://jsonplaceholder.typicode.com/todos";
var elements = [];
var title = "";
document.getElementById("load_todo_block").style.display = localStorage.loadDisplay;
document.getElementById("new_todo_input").style.display = localStorage.addToDoDisplay;

function Task(item)
{
  this.item = item,
  this.tasks = [],
  this.setTasks = function()
  {
    this.tasks = JSON.parse(localStorage.getItem(this.item));
  }
  this.getTasks = function()
  {
    return this.tasks;
  }
}

var todos = new Task("tasks");
todos.setTasks();
var tasks = todos.getTasks();

add_todo.onclick = function()
{
  title = document.getElementById("new_todo").value;
  var panel = document.getElementById("todo");
  var task = {
    id: JSON.stringify(tasks.length + 1),
    title: title,
    state: "todo"
  }
  addLCEItem(task);
  var newTodoElement = createTodoElement(tasks.length, task["title"]);
  panel.appendChild(newTodoElement);
}

load_todo.onclick = function()
{
  var requestOptions = {
    url: server,
    method: "GET"
  };
  localStorage.loadDisplay = "none";
  localStorage.addToDoDisplay = "block";

  makeRequest(requestOptions, updateToDoFromServer);
}

clear.onclick = function()
{
  localStorage.clear();
  location.reload();
}

delete_task.onclick = function()
{
  var taskId = document.getElementById("delete_field").value;
  deleteLCItem(taskId);
  location.reload();
}

function updateToDoFromServer(todosArray) 
{
  var NUMBER_OF_TODO = 10;
  for (var i = 0; i < NUMBER_OF_TODO; i++) {
    addToDoFromServer(todosArray[i]);
  }
  localStorage.setItem("tasks", JSON.stringify(elements));
  location.reload();
}

function addToDoFromServer(todoObject) 
{
  var panel = document.getElementById("todo");
  var newTodoElement = createTodoElement(todoObject.id, todoObject.title);
  state.todo.push({id: todoObject.id, title: todoObject.title});
  panel.appendChild(newTodoElement);
}

var state = {
  todo: [],
  inprogress: [],
  done: [],
  addItemToState: function(key, item) {
    this[key].push(item);
  },
  deleteItemFromState: function(key, item) {
    this[key] = this[key].filter(element => element.id != item.id - 1);
  },
  moveItemToOtherPanel: function(key1, key2, itemId) {
    if(itemId < 10)
    {
      var item = tasks[itemId];
      updateLocalStorage(item.id - 2, key2);
    }
    else{
      var item = tasks[itemId-1];
      updateLocalStorage(item.id - 1, key2);
    }
    
    this.deleteItemFromState(key1, item);
    this.addItemToState(key2, item);
  }
}

document.addEventListener('DOMContentLoaded', initBoard);

function initBoard() 
{
 if(localStorage.length > 0 && localStorage["tasks"].length > 0)
 {
  if(tasks[0]["state"] === undefined)
  {
    for(var i = 0; i < tasks.length; i++)
    {
      tasks[i]["state"] = "todo";
      updateLocalStorage(i, "todo");
      state.todo.push(tasks[i]);
    }
  }
  else{
    for(var i = 0; i < tasks.length; i++)
    {
      if(tasks[i]["state"] === "todo"){
        state.addItemToState("todo", tasks[i]);
      }
      else if(tasks[i]["state"] === "inprogress"){
        state.addItemToState("inprogress", tasks[i]);
      }
      else if(tasks[i]["state"] === "done"){
        state.addItemToState("done", tasks[i]);
      }
    }
  }
 }
 initPanel('todo', state.todo);
 initPanel('inprogress', state.inprogress);
 initPanel('done', state.done);
}

function initPanel(key, todoList) 
{
  var panel = document.getElementById(key);
  for(var i = 0; i< todoList.length; i++) {
    var currentItemObject = todoList[i];
    var newTodoElement = createTodoElement(currentItemObject.id, currentItemObject.title);
    panel.appendChild(newTodoElement);
  }
}

function createTodoElement(id, title) 
{
  var todoElement = document.createElement("span");
  todoElement.id = id;
  todoElement.draggable = true; // for drag and drop
  todoElement.ondragstart=onDragStart; // for drag and drop
  todoElement.textContent = title;
  var savedElement = {
    id: todoElement.id,
    title: todoElement.textContent
  }
  elements.push(savedElement);
  return todoElement;
}

function makeRequest(requestOptions, successHandler) 
{
  var httpRequest = false;

  if (window.XMLHttpRequest) {
    // Mozilla, Safari, ...
    httpRequest = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    // IE
    try {
      httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {}
    }
  }

  if (!httpRequest) {
    alert("Не вышло :( Невозможно создать экземпляр класса XMLHTTP ");
    return false;
  }
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == 4) {
      if (httpRequest.status == 200) {
        var responseData = JSON.parse(httpRequest.responseText);
        successHandler(responseData);
      } else {
        console.error("С запросом возникла проблема.");
      }
    }
  };
  httpRequest.open(requestOptions.method, requestOptions.url, true);
  httpRequest.send(requestOptions.params || null);
}

function getLocalStorage()
{
  var todos = JSON.parse(localStorage.getItem("tasks"));
  
  for(var i = 0; i < todos.length; i++)
    {
      todos[i]["state"] = "todo";
    }

  return todos;
}

function updateLocalStorage(id, state)
{
  var todos = tasks;
  
  for(var i = 0; i < todos.length; i++)
  {
    if(i === id)
    {
      todos[i]["state"] = state;
    }
  }

  localStorage.setItem("tasks", JSON.stringify(todos));

  return todos;
}

function addLCEItem(task)
{
  var todos = tasks;

  todos.splice(todos.length + 1, 0, task);
  state.addItemToState("todo", task);

  localStorage.setItem("tasks", JSON.stringify(todos));

  location.reload();
}

function deleteLCItem(id)
{
  var todos = tasks;
  
  for(var i = 0; i < todos.length; i++)
  {
    if(todos[i]["id"] === id)
    {
      todos.splice(i, 1);
    }
  }

  localStorage.setItem("tasks", JSON.stringify(todos));
  return todos;
}

