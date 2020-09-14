const title = document.querySelector("#title");
const CLICKED_CLASS = "clicked";

function handleClick() {
  /*  //true, false return
  const hasClass = title.classList.contains(CLICKED_CLASS);

  if (!hasClass) {
    title.classList.add(CLICKED_CLASS);
  } else {
    title.classList.remove(CLICKED_CLASS);
  }
*/

  //class가 있으면 add, 아니면 remove
  title.classList.toggle(CLICKED_CLASS);
}
function init() {
  title.addEventListener("click", handleClick);
}

init();
