console.log('map view active');
var map;
var service;
var infowindow;
let user = {
  token: "",
  id: "",
  data: {},
};

user.token = localStorage.getItem('jwt');
const BASE = 'http://localhost:4000';

console.log('token', user.token);

// console.log($here);

if (!!user.token) {
  //send data to server
  fetch(`${BASE}/api/v1/profile`, {
    method: 'POST',
    headers: {
      'authorization': `bearer ${user.token}`,
    }
  })
    .then(res => res.json())
    .then((data) => {
      user.id = data._id;
      console.log(user.id);
      user.data = data;
      console.log('data', data);
      initMap();
      // render(data);
    })
    .catch(err => console.log(err))
} else {
  window.location = '/login';
}

function initMap() {
  var sf = new google.maps.LatLng(37.773972, -122.431297);

  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(
    document.getElementById('map'), { center: sf, zoom: 15 });
  createMarkers(user.data.toDoList);
}

const createMarkers = (array) => {
  console.log(array);
  console.log(array.length);
  let zIndexNum = array.length;
  array.forEach(list => {
    let name = list.location.locationName;
    console.log(name);

    let lat = list.location.latitude;
    let lng = list.location.longitude;
    const latLng = new google.maps.LatLng(lat, lng);

    let itemLength = list.item.length;
    console.log(list.item);
    // Placing markers on the map
    let newMarker = new google.maps.Marker({
      title: name,
      position: latLng,
      map: map,
      label: `${itemLength}`,
      animation: google.maps.Animation.DROP,
      /* TODO add number returned from ajax request to marker */
      // label: //should be number returned from ajax request to list items
      zIndex: zIndexNum
    });
    google.maps.event.addListener(newMarker, 'click', function () {
      infowindow.setContent(name);
      infowindow.open(map, this);
    });

    zIndexNum--
  });
}



// function getLists() {
//   $.ajax({
//     method: 'GET',
//     url: "http://localhost:4000/api/v1/list/index",
//     success: onSuccessUser,
//     error: onError
//   });
// };

// const onSuccessUser = response => {
//   // console.log(response.data);
//   user.listArray = response.data.filter(obj => {
//     return obj.user === user.id;
//   })
//   console.log(user.listArray);
//   findLocation();
// }

// function getLocations() {
//   $.ajax({
//     method: 'GET',
//     url: "http://localhost:4000/api/v1/location/index",
//     success: onSuccess,
//     error: onError
//   });
// };

// const onSuccess = response => {
//   user.locationArray = response.data;
//   // console.log(locationArray);
//   createMarkers(response.data);
// };

// /* Created this to get the count of the items in the todo list, it works but it's not in sync with the loop. It fires off after the markers are already created */
// function getToDoList(id) {
//   // console.log('starting request');
//   $.ajax({
//     method: 'GET',
//     url: `http://localhost:4000/api/v1/list/detail/${id}`,
//     success: onSuccessList,
//     error: onError
//   });
// };

// const onSuccessList = response => {
//   itemLen = response.data.item.length;
//   // console.log(itemLen);
//   // console.log('ending request');
//   return itemLen
//   // createMarkers(response.data);
// };

// const findLocation = (locationId) => {
//   $.ajax({
//     method: 'GET',
//     url: `http://localhost:4000/api/v1/location/${locationId}`,
//     success: onSuccessLocation,
//     error: onError
//   });
// }

// const onSuccessLocation = response => {
//   console.log(response)
// }

// function onError() {
//   console.log('error');
// }

// getLists();
// initMap();