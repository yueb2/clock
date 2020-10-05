const weatehr = document.querySelector(".js-weather");
const API_KEY = "dbb60e25f7a6f4004315aba096dd84e0";
const COORDS = "coords";

function getWeather(lat, lon) {
  //데이터를 얻기위해 fetch()사용. url 앞에 https://를 붙여준다.
  //데이터가 완전히넘어오게 되면 then()절을 실행한다.
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    // response의 json Ojbect를 가져오고난 뒤 실행
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      weatehr.innerText = `${temperature} @ ${place}`;
    });
}
function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucess(position) {
  //좌표 (위도, 경도)
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude, //latitude: latitude,
    longitude, //longitude: longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}
function handleGeoError() {
  console.log("Can't access geo location");
}
function askForCoords() {
  //navigator API
  //getCurrentPosition(성공했을때 가져올 fn, 실패했을때 가져올 fn)
  navigator.geolocation.getCurrentPosition(handleGeoSucess, handleGeoError);
}

function loadCodrds() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    //좌표 요청
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}
function init() {
  loadCodrds();
}

init();
