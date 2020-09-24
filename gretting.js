const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  // text박스에서 엔터를 누르게 되면, 이벤트가 발생하게되는데 이때 defalt로 화면이 새로고침된다.
  //prevetnDefault는 이를 막아주므로, 엔터를 쳐도 화면이 새로고침 되지 않는다.
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}
function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}
function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    //She is not
    askForName();
  } else {
    //She is
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
