
var newTodo = "";
var server = "https://jsonplaceholder.typicode.com/todos";
add_todo.onclick = function()
{
  newTodo = document.getElementById("new_todo").value;
  var panel = document.getElementById("todo");
  var newTodoElement = createTodoElement(state.todo.length, newTodo);
  state.todo.push({id: state.todo.length, title: newTodo});
  panel.appendChild(newTodoElement);
  setLocalStorage('todo', state.todo.length, newTodo);
  console.log(newTodoElement);
  console.log(state.todo);
}

load_todo.onclick = function()
{
  var requestOptions = {
    url: server,
    method: "GET"
  };

  makeRequest(requestOptions, updateToDoFromServer);
}

function updateToDoFromServer(todosArray) {
  var NUMBER_OF_TODO = 10;
  var panel = document.getElementById("todo");
  for (var i = 0; i < NUMBER_OF_TODO; i++) {
    attToDoFromServer(todosArray[i]);
  }
}

function attToDoFromServer(todoObject) 
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
    this[key] = this[key].filter(element => element.id != item.id);
  },
  moveItemToOtherPanel: function(key1, key2, itemId) {
    var item = state[key1].find(element => element.id == itemId);
    this.deleteItemFromState(key1, item);
    this.addItemToState(key2, item);
  }
}

document.addEventListener('DOMContentLoaded', initBoard);

function initBoard() {
 initPanel('todo', state.todo);
 initPanel('inprogress', state.inprogress);
 initPanel('done', state.done);
}

function initPanel(key, todoList) {
  var panel = document.getElementById(key);
  for(var i = 0; i< todoList.length; i++) {
    var currentItemObject = todoList[i];
    var newTodoElement = createTodoElement(currentItemObject.id, currentItemObject.title);
    panel.appendChild(newTodoElement);
  }
}

function createTodoElement(id, title) {
  var todoElement = document.createElement("span");
  todoElement.id = id;
  todoElement.draggable = true; // for drag and drop
  todoElement.ondragstart=onDragStart; // for drag and drop
  todoElement.textContent = title;
  return todoElement;
}

function makeRequest(requestOptions, successHandler) {
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

function setLocalStorage(state, id, title)
{
  localStorage.state = state;
  localStorage.id = id;
  localStorage.title = title;
}