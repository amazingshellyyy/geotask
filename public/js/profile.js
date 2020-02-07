const token = localStorage.getItem('jwt');


if (!!token) {
  //send data to server

  fetch(`/api/v1/profile`, {
    method: 'POST',
    headers: {
      'authorization': `bearer ${token}`,
    }
  })
    .then(res => res.json())
    .then((data) => {
      console.log('data', data);
      render(data);
    })
    .catch(err => console.log(err))
} else {
  window.location = '/login';
}


const render = (data) => {
  $('.profile').append(`<ul><li>Email: ${data.email}</li></ul>`)
}