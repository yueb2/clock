const API_KEY = "dbb60e25f7a6f4004315aba096dd84e0";
const COORDS = "coords";

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
  const loadedCdords = localStorage.getItem(COORDS);
  if (loadedCdords === null) {
    //좌표 요청
    askForCoords();
  } else {
    {
      //getWeather
    }
  }
}
function init() {
  loadCodrds();
}

init();
