console.log('ToDo!');

const $list = $('.list');
console.log($list);


let url = new URL(window.location.href.toString());
let query_string = url.search;
let search_params = new URLSearchParams(query_string); 
let listId = search_params.get('id');

fetch(`/api/v1/list/detail/${listId}`, {
  method: 'GET',
  headers: {
    'content-Type': 'application/json',
  },
  // body: JSON.stringify(listData),
})
  .then(res => res.json())
  .then((data) => {
    render(data);
  })
  .catch(err => console.log(err))



const render = (data) => {
  $list.append(`<li id="list-title">List Title: <input value='${data.data.listTitle}'disabled/></li>
  <li id="due-date">Due Date: <input disabled/></li>
  <li id="location">Location: <input value='${data.data.location}' disabled/></li>
  <li>Items <input disabled/></li>`)
  const $Inputs = $(`li > input`);
  console.log($Inputs);
  $Inputs.on('click', ()=> {
  console.log('345');
  $Inputs.prop('disabled', false);
})
}





 
