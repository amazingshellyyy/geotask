console.log('hii');
const BASE = 'http://localhost:4000';
// const $addBtn = $('#addItem');
const $addBtn = $('.addItem');
const $addItemlist = $('ul');
// console.log($addItemlist);
// console.log($addBtn);
$addBtn.on('click', () => {
  event.preventDefault();
  console.log('click!');
  $addItemlist.append(`<div>
  <input type="text" class="item" id="" name="item" placeholder="items to add">
</div>`)
})
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
  const $formEle = $form.prop('elements');
  const formInput = [...$formEle];
  console.log('hiiiii');
  console.log(formInput);

  let formIsValid = true;
  for (let i = 0; i < formInput.length; i++) {
    if (formInput[i].localName === 'button') {
      formInput.splice(i, 1);
    } else if (formInput[i].value === '') {
      formIsValid = false;
      formInput[i].classList.add('input-error');
      formInput[i].insertAdjacentHTML('afterend', `<div class="alert">Please enter valid information</div>`)
    } else {
      listData[formInput[i].id] = formInput[i].value;
    }
  }

  console.log('listData', listData);

  //fetch list
  if (formIsValid) {
    //send data to server
    fetch(`${BASE}/api/v1/list/create`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify(listData),
    })
      .then(res => res.json())
      .then((data) => {
        // const jwt = data.jwt;
        // localStorage.setItem('jwt', jwt);
        // window.location =  '/profile';
        console.log('data', data.data._id);
        const listId = data.data._id;
        let url = new URL(`${BASE}/detail`);
        let query_string = url.search;
        let search_params = new URLSearchParams(query_string);
        search_params.append('id', `${listId}`);
        url.search = search_params.toString();
        let new_url = url.toString();

        // output : http://demourl.com/path?id=100&id=101&id=102&topic=main
        console.log(new_url);
        window.location = new_url;
        
      })
      .catch(err => console.log(err))

  }


})






