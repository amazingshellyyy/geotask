console.log('map view active');
var map;
var service;
var infowindow;

/* TODO create an ajax request to get the user's home location */

function initMap() {
  var sf = new google.maps.LatLng(37.773972, -122.431297);

  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(
    document.getElementById('map'), { center: sf, zoom: 15 });

  /* TODO Move this Places request to another file. */
  /* This Places request should be used for searching for locations, not for placing markers on the map from the list locations database. */
  var request = {
    query: "cvs",
    fields: ['name', 'geometry'],
  };

  service = new google.maps.places.PlacesService(map);

  service.findPlaceFromQuery(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        console.log(results[i]);
        console.log(results[i].name);
        console.log(results[i].geometry.location.lat());
        console.log(results[i].geometry.location.lng());
        createMarker(results[i]);
      }

      map.setCenter(results[0].geometry.location);
    }
  });
  getLocations();
}

function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });

  // var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  // var markers = locations.map(function (location, i) {
  //   return new google.maps.Marker({
  //     position: location,
  //     label: labels[i % labels.length]
  //   });
  // });

  // Add a marker clusterer to manage the markers.
  // var markerCluster = new MarkerClusterer(map, markers,
  //   { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
}


const createMarkers = (array) => {
  let zIndexNum = array.length;
  array.forEach(location => {
    console.log(location);
    let name = location.locationName;
    let toDoList = location.toDoList[0]
    /* TODO refactor this function into an async/await function to return the number of items in the list before completing this loop */
    getToDoList(toDoList);
    let toDoListItems = []
    // console.log(location.toDoList[0]);
    // console.log(name);
    // console.log(location.longitude);
    // console.log(location.lattitude);
    const latLng = new google.maps.LatLng(location.lattitude, location.longitude);
    // console.log(latLng);

    // Placing markers on the map
    let newMarker = new google.maps.Marker({
      title: name,
      position: latLng,
      map: map,
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

function getLocations() {
  $.ajax({
    method: 'GET',
    url: "http://localhost:4000/api/v1/location/index",
    success: onSuccess,
    error: onError
  });
}

/* Created this to get the count of the items in the todo list, it works but it's not in sync with the loop. It fires off after the markers are already created */
function getToDoList(id) {
  console.log('starting request');
  $.ajax({
    method: 'GET',
    url: `http://localhost:4000/api/v1/list/detail/${id}`,
    success: onSuccessList,
    error: onError
  });
}

let locationArray = []

const onSuccess = response => {
  locationArray = response.data;
  // console.log(locationArray);
  createMarkers(response.data);
}
const onSuccessList = response => {
  itemLen = response.data.item.length;
  console.log(itemLen);
  console.log('ending request');
  return listObj
  // createMarkers(response.data);
}
function onError() {
  console.log('error');
}

initMap();