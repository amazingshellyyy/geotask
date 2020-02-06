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
// var bounds = new google.maps.LatLngBounds();

function initMap() {
  var sf = new google.maps.LatLng(37.773972, -122.431297);

  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(
    document.getElementById('map'), { center: sf, zoom: 15 });
  createMarkers(user.data.toDoList);
}

const createMarkers = (array) => {
  console.log(array);
  // console.log(array.length);
  let zIndexNum = array.length;
  array.forEach(list => {
    let locationName = list.location.locationName;
    // console.log(name);
    console.log(list._id);
    let listId = list._id;
    let lat = list.location.latitude;
    let lng = list.location.longitude;
    const latLng = new google.maps.LatLng(lat, lng);

    let listName = list.listTitle;
    console.log(listName);
    let itemLength = list.item.length;
    // console.log(list.item);
    let template = `
      <h1>${locationName}</h1>
      <h2><a href="${BASE}/detail/?id=${listId}">${listName}</a></h2>
      `;
    let itemCount = 0
    for (i = 0; i < list.item.length; i++) {
      console.log(list.item[i].status);
      if (list.item[i].status === false) {
        template += `<p>${list.item[i].itemName}</p>`;
        itemCount++
      }
    }
    // Placing markers on the map
    let newMarker = new google.maps.Marker({
      title: name,
      position: latLng,
      map: map,
      label: `${itemCount}`,
      animation: google.maps.Animation.DROP,
      zIndex: zIndexNum
    });
    // bounds.extend(newMarker.position);
    google.maps.event.addListener(newMarker, 'click', function () {
      /* TODO show the items in the info pane */
      /* TODO create divs for a template literal to inject the template into the info pane. */
      /* TODO Have the list title be a link to the list detail page. */
      infowindow.setContent(template);
      infowindow.open(map, this);
    });
    zIndexNum--
  });
}