/* Google Maps Variables */
var map;
var service;
var infowindow;

/* User Data */
let user = {
  token: "",
  id: "",
  data: {}
};

/* Validating Signin Token Stored Locally */
user.token = localStorage.getItem('jwt');
const BASE = 'http://localhost:4000';

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
      // storing the data in the user object
      user.id = data._id;
      user.data = data;
      initMap();
    })
    .catch(err => console.log(err))
} else {
  window.location = '/login';
}

function initMap() {
  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(
    document.getElementById('map')
  );
  createMarkers(user.data.toDoList);
}

const createMarkers = (array) => {
  var bounds = new google.maps.LatLngBounds();
  let zIndexNum = array.length;

  array.forEach(list => {
    // Getting position for Marker
    let lat = list.location.latitude;
    let lng = list.location.longitude;
    const latLng = new google.maps.LatLng(lat, lng);
    // Creating content for Marker Info Window
    let listId = list._id;
    let locationName = list.location.locationName;
    let listName = list.listTitle;
    let template = `
      <h1>${locationName}</h1>
      <h2><a href="${BASE}/detail/?id=${listId}">${listName}</a></h2>
      `;
    // Filtering out List Items that have been Completed
    let itemCount = 0
    for (i = 0; i < list.item.length; i++) {
      if (list.item[i].status === false) {
        // Appending List Item to Template
        template += `<p>${list.item[i].itemName}</p>`;
        itemCount++
      }
    }
    // Placing markers on the Map
    let newMarker = new google.maps.Marker({
      title: name,
      position: latLng,
      map: map,
      label: `${itemCount}`,
      animation: google.maps.Animation.DROP,
      zIndex: zIndexNum
    });
    // Extending the bounds of the Map
    bounds.extend(latLng);
    // Creating the Info Window over the Marker
    google.maps.event.addListener(newMarker, 'click', function () {
      // Placing Template on Info Window
      infowindow.setContent(template);
      infowindow.open(map, this);
    });
    zIndexNum--
  });
  // Bounding the Map to the existing Markers
  map.fitBounds(bounds);
}