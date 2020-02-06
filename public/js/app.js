const token = localStorage.getItem('jwt');
// console.log(token);
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
  .catch(err => console.log(err))


const render = (data)=> {
  for (let i = 0; i < data.length; i++) {
    const list = data[i];
    $('#list-group').append(`<li id="list${i+1}">${list.listTitle}<ul id="items" style="display: none;">items is here
  </ul></li>`)
  }
}

$('ul').on('click', 'li', ()=>{
  console.log($('ul ul'));
  $(event.target).children().toggle();

})