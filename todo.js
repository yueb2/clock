const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

function filterFn(toDo) {
  // forEach에서 function을 실행하는 것 같이 각각의 item과 같이 실행
  return toDo.id === 1;
}

let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  //filter는 array의 모든 item을 통해 function을 실행하고,
  //true인 item만을 가지고 새로운 array를 만든다.
  const cleanToDos = toDos.filter(function (toDo) {
    //console.log(typeof li.id);
    //console.log(typeof toDo.id);
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}
function saveToDos() {
  //toDos를 가져와서 local에 저장하는행위
  //localStorage에는 자바스크립트의 data를 저장할 수 없다. 오직 String만 저장가능.
  //JSON.stringify : javascript object를 String으로 바꿔줌
  //JSON : JavaScript Object Notation. 데이터 전달시 자바스크립트가 그것을 다룰수 있도록 object로 바꿔주는 기능.
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;

  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    //forEach : array에 담겨있는 것들 각각에 한번씩 함수를 실행시켜준다.
    parsedToDos.forEach((toDo) => {
      paintToDo(toDo.text);
    });
  }
}
function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
