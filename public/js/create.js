const BASE = 'http://localhost:4000';
const token = localStorage.getItem('jwt');

// const $addBtn = $('#addItem');
/* Google Api */
var searchInput = 'locationName';
var autocomplete;
autocomplete = new google.maps.places.Autocomplete((document.getElementById(searchInput)), {
  types: ['geocode'],
  componentRestrictions: {
    country: "USA",
  },
  radius: '500'
});
google.maps.event.addListener(autocomplete, 'place_changed', function () {
  var near_place = autocomplete.getPlace();
  document.getElementById('latitude').value = near_place.geometry.location.lat();
  document.getElementById('longitude').value = near_place.geometry.location.lng();
  document.getElementById('latitude_view').innerHTML = near_place.geometry.location.lat();
  document.getElementById('longitude_view').innerHTML = near_place.geometry.location.lng();

});
// $(document).on('change', '#' + searchInput, function () {
//   document.getElementById('latitude_input').value = '';
//   document.getElementById('longitude_input').value = '';
//   document.getElementById('latitude_view').innerHTML = '';
//   document.getElementById('longitude_view').innerHTML = '';
// });

$('#searchInput').on('keyup', () => {
  document.getElementById('latitude_input').value = '';
  document.getElementById('longitude_input').value = '';
  document.getElementById('latitude_view').innerHTML = '';
  document.getElementById('longitude_view').innerHTML = '';
})
/* ------ */

const clearAlertMessage = () => {
  document.querySelectorAll('.alert').forEach(ele => {
    ele.remove();
  })
  document.querySelectorAll('.input').forEach(ele => {
    ele.removeClass();
  })
}
const $form = $('form');

$form.on('submit', () => {
  clearAlertMessage();
  event.preventDefault();
  const listData = {};
  const list = {};
  const location = {};
  const items = [];
  const $formEle = $form.prop('elements');
  const formInput = [...$formEle];


  let formIsValid = true;
  //check valid and filter out button
  for (let i = 0; i < formInput.length; i++) {
    if (formInput[i].localName === 'button') {
      formInput.splice(i, 1);
    } else if (formInput[i].value === '') {
      formIsValid = false;
      formInput[i].classList.add('input-error');
      formInput[i].insertAdjacentHTML('afterend', `<div class="alert">Please enter valid information</div>`)
    }
  }
  const toDo = formInput.slice(0, 2);
  const loca = formInput.slice(2, 5);
  const it = formInput.slice(5, formInput.length - 1);

  toDo.forEach(input => {
    list[`${input.id}`] = input.value;
  })
  loca.forEach(input => {
    location[`${input.id}`] = input.value;
  })
  it.forEach(input => {
    items.push(`${input.value}`);
  })

  listData.list = list;
  listData.location = location;
  listData.items = items;
  listData.curUserId = token;

  //fetch list
  if (formIsValid) {
    //send data to server
    fetch(`${BASE}/api/v1/list/create`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        'authorization': `bearer ${token}`,
      },
      body: JSON.stringify(listData),
    })
      .then(res => res.json())
      .then((data) => {

        const listId = data.createdToDoList._id;
        let url = new URL(`${BASE}/detail`);
        let query_string = url.search;
        let search_params = new URLSearchParams(query_string);
        search_params.append('id', `${listId}`);
        url.search = search_params.toString();
        let new_url = url.toString();

        window.location = new_url;

      })
      .catch(err => console.log(err))

  }


})
const $addBtn = $('.addItem');
const $addItemlist = $('ul');
$addBtn.on('click', () => {
  event.preventDefault();
  $(this).append(`<li>
  <div class="form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <input type="text">
    <button class="addItem">+</button>
  </div>
</li>`)
})

$addItemlist.on('click', '.addItem', () => {
  event.preventDefault();
  $(event.target).css("display", 'none');
  $addItemlist.append(`<li>
  <div class="form-check">
    <input type="text">
    <button class="addItem">+</button>
  </div>
</li>`)
})

