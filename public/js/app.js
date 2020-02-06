const token = localStorage.getItem('jwt');

fetch(`/api/v1/list/index`, {
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
    render(data);
  })
  .then(res => res.json())
  .then((data) => {
    console.log('data', data);
    render(data);
  })
  .catch(err => console.log(err))

const render = (data) => {
  for (let i = 0; i < data.length; i++) {
    const list = data[i];
    $('#list-group').append(`< form > <li class="list-group-item" id="list${i + 1}" listId="${list._id}">${list.listTitle}<a id="listlink" href="/detail?id=${list._id}" class="float-right btn btn-link">></a><ul class="items list-unstyled" style="display: none;">
      </ul></li>`)
    for (let j = 0; j < data[i].item.length; j++) {
      const item = data[i].item[j];
      if (item.status === false) {
        $(`#list${i + 1} > ul`).append(` < li >
    <div class="form-check">
      <input type="checkbox" class="form-check-input">
        <span id="${item._id}" type="text" value="${item.itemName}" required="true" itemId="${item._id}">${item.itemName}</span>
        
      </div>
    </li>`)
      } else {
        $(`#list${i + 1} > ul`).append(` < li >
    <div class="form-check">
      <input type="checkbox" class="form-check-input" checked="true">
        <span id="${item._id}" type="text" value="${item.itemName}" required="true" itemId="${item._id}">${item.itemName}</span>
         
        </div>
      </li>`)
      }
    }
  }
}



getPage();

$('ul').on('click', 'li', () => {
  $(event.target).children().toggle();

})

// $('form').on('click', '.list-group-item', ()=>{

// })
console.log($('ul'));
$('ul').on('click', '.form-check-input', () => {
  console.log($(event.target));
  console.log($(event.target).prop('checked'));
  console.log($(event.target).next());
  console.log($(event.target).next().prop('id'));
  console.log($(event.target).next().prop('innerText'));
  let itemId = $(event.target).next().prop('id');
  let status = $(event.target).prop('checked');
  let itemData = {
    status: status
  }
  fetch(`/ api / v1 / item / detail / ${itemId} `, {
    method: 'PUT',
    headers: {
      'content-Type': 'application/json',
      'authorization': `bearer ${token} `,
    },
    body: JSON.stringify(itemData),
  })
    .then(res => res.json())
    .then((data) => {
      console.log('itemupdatedata', data);
      // clearPage();
      // getPage();

    })
    .catch(err => console.log(err))


})

