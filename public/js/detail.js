console.log('ToDo!');
const BASE = 'http://localhost:4000';
const $form = $('form');
const token = localStorage.getItem('jwt');
// console.log($form);
let autocomplete;

let url = new URL(window.location.href.toString());
let query_string = url.search;
let search_params = new URLSearchParams(query_string);
let listId = search_params.get('id');

fetch(`/api/v1/list/detail/${listId}`, {
  method: 'GET',
  headers: {
    'content-Type': 'application/json',
    'authorization': `bearer ${token}`,
  },
  // body: JSON.stringify(listData),
})
  .then(res => res.json())
  .then((data) => {
    console.log('data', data);
    const list = data.data;
    console.log('list', list);
    render(list);
  })
  .catch(err => console.log(err))



const render = (list) => {
  $form.append(`
<div class="form-group">
    <label for="listTitle">List Title</label>
    <input type="text" class="form-control" id="listTitle" placeholder="Enter list title" name="listTitle" value="${list.listTitle}">
  </div>
  <div class="form-group">
    <label for="dateDue">Due date</label>
    <input type="date" class="form-control" id="dateDue" name="dateDue" value="${list.dateDue}">
  </div>
  <!-- Autocomplete location search input -->
      <div class="form-group">
        <label>Location:</label>
        <input type="text" class="form-control" id="locationName" placeholder="Type address..." name="locationName" value="${list.location.locationName}"/>
      </div>
  <ul class="list-unstyled itemList">
    <div>Item</div>
    
  </ul>
  
  <button type="submit" class="save btn-primary float-right" style="display: none">Save</button>
  <button class="delete btn-secondary float-right">Delete</button>
`)

  const itemList = list.item;
  for (let i = 0; i < itemList.length; i++) {
    const item = itemList[i];

    if (i === itemList.length - 1) {
      $('.itemList').append(`<li>
    <div class="form-check">
      <input type="checkbox" class="form-check-input">
      <input id="item${i}" type="text" value="${item.itemName}" required="true">
      <a href="" class="float-right delItem">delete</a>
    </div>
    <button class="addItem">+</button>
  </li>`)
    } else {
      $('.itemList').append(`<li>
  <div class="form-check">
    <input type="checkbox" class="form-check-input">
    <input id="item${i}" type="text" value="${item.itemName}" required="true">
    <a href="" class="float-right delItem">delete</a>
  </div>
</li>`)
    }
    const id = `item${i}`;
    if (item.status === "false") {
      $('id').prev().removeProp('checked');
    } else {
      $('id').prev().prop('checked');
    }
  }

  console.log($('.itemList'));
  console.log($('.delItem'))
  $('.itemList').on('click', '.delItem', () => {
    console.log(event.target);
    event.preventDefault();
    $(event.target).parent().remove();
    $('button').css('display', '');
  })


  const $addBtn = $('.addItem');
  const $addItemlist = $('.itemList');

  // console.log('btn',$addBtn);
  // console.log($addItemlist);
  $addItemlist.on('click', '.addItem', () => {
    event.preventDefault();
    $addItemlist.append(`<li>
  <div class="form-check">
    <input type="checkbox" class="form-check-input">
    <input type="text" class="blank" required="true">
    <a href="" class="float-right delItem">delete</a>
  </div> 
  <button class="addItem">+</button>
</li>`)
    // $(event.target).css("display", 'none');
    $(event.target).remove();
  })
  let searchInput = 'locationName';
  autocomplete = new google.maps.places.Autocomplete((document.getElementById(searchInput)), {
    types: ['geocode'],
    componentRestrictions: {
      country: "USA",
    },
    radius: '500'
  });
}



$('.save').on('click', ()=> {
  var near_place = autocomplete.getPlace();
  lat = near_place.geometry.location.lat();
  long = near_place.geometry.location.lng();

})


/* Delete list */
$form.on('click', '.delete', () => {
  console.log('delete button');
  if (confirm('Are you sure you want to delete the list?')) {
    fetch(`/api/v1/list/detail/${listId}`, {
      method: 'DELETE',
      headers: {
        'content-Type': 'application/json',
      },
      // body: JSON.stringify(listData),
    })
      .then(res => res.json())
      .then((data) => {
        console.log('data', data);
        window.location = '/';

      })
      .catch(err => console.log(err))
  }
})



$form.on('click', 'input', () => {
  $('button').css('display', '');

  // google.maps.event.addListener(autocomplete, 'place_changed', function () {
  //   var near_place = autocomplete.getPlace();
  //   document.getElementById('latitude').value = near_place.geometry.location.lat();
  //   document.getElementById('longitude').value = near_place.geometry.location.lng();
  //   document.getElementById('latitude_view').innerHTML = near_place.geometry.location.lat();
  //   document.getElementById('longitude_view').innerHTML = near_place.geometry.location.lng();

  // });


  // $('#searchInput').on('keyup', () => {
  //   document.getElementById('latitude_input').value = '';
  //   document.getElementById('longitude_input').value = '';
  //   document.getElementById('latitude_view').innerHTML = '';
  //   document.getElementById('longitude_view').innerHTML = '';
  // })
  /* ------ */
})



/* Update */
const clearAlertMessage = () => {
  document.querySelectorAll('.alert').forEach(ele => {
    ele.remove();
  })
  document.querySelectorAll('.input').forEach(ele => {
    ele.removeClass();
  })
}

const $save = $('.save');
let lat = 0;
let long = 0;
//submiting update form
$form.on('submit', () => {
  clearAlertMessage();
  event.preventDefault();
  console.log(lat);
  console.log(long);
  const listData = {};
  const list = {};
  const location = {};
  const items = [];
  const $formEle = $form.prop('elements');
  const formInput = [...$formEle];
  console.log('hiiiii');
  console.log(formInput);

  let formIsValid = true;
  //check valid and filter out button
  for (let i = 0; i < formInput.length; i++) {
    if (formInput[i].tagName === 'BUTTON') {
      formInput.splice(i, 1);
    } else if (formInput[i].className === 'form-check-input') {
      console.log(formInput[i]);
      // formInput[i].prop('value',formInput[i].checked);
    } else if (formInput[i].value === '') {
      console.log(formInput[i]);
      formIsValid = false;
      formInput[i].classList.add('input-error');
      formInput[i].insertAdjacentHTML('afterend', `<div class="alert">Please enter valid information</div>`)
    }

  }
  console.log(formInput);
  let toDo = formInput.slice(0, 2);
  let loca = formInput.slice(2, 3);
  let it = formInput.slice(3, formInput.length - 1);
  console.log(toDo);
  console.log(loca);
  console.log(it);
  toDo.forEach(input => {
    list[`${input.id}`] = input.value;
  })
  loca.forEach(input => {
    location[`${input.id}`] = input.value;
  })

  for (let i = 0; i < it.length; i++) {
    const itemObj = {}
    if (i % 2 === 0) {
      itemObj.status = it[i].checked;
      itemObj.itemName = it[i + 1].value;
      items.push(itemObj);
    }

  }

  console.log(list);
  console.log(location);
  console.log(items);
  // listData.id = listId;
  listData.list = list;
  listData.location = location;
  listData.location.latitude = lat;
  listData.location.longitude = long;
  listData.items = items;
  console.log("update list to be send", listData);
  //fetch list
  if (formIsValid) {
    //send data to server
    fetch(`${BASE}/api/v1/list/detail/${listId}`, {
      method: 'PUT',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify(listData),
    })
      .then(res => res.json())
      .then((data) => {
        console.log('data', data);
        // location.reload();
      })
      .catch(err => console.log(err))
  }

  $('.blank').removeClass('blank')
  $('.save').css('display', 'none');

})



