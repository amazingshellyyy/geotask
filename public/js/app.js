const token = localStorage.getItem('jwt');
const API = 'http://localhost:4000';

console.log('token',token);
const $here = $('.here');
console.log($here);

if (!!token) {
  //send data to server
  fetch(`${API}/`, {
    method: 'GET',
    headers: {
      'Autorization': `bearer ${token}`,
    }
  })
    .then(res => res.json())
    .then((data) => {
      console.log('data',data);
      // window.location = ('/');
    })
    .catch(err => console.log(err))
}