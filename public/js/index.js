const token = localStorage.getItem('jwt');

checkLogin= (token)=>{
  $('.ml-auto li').remove();
  if (token) {
    $('.ml-auto').append(`<li class="nav-item">
    <a class="nav-link" href="/profile">Profile</a>
  </li><li class="nav-item">
  <a class="nav-link" id="logout" href="/">Log out</a>
  </li>`)
  } else {
    $('.ml-auto').append(`<li class="nav-item">
    <a class="nav-link" href="/login">log in</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="/signup">Sign up</a>
  </li>`)
  }
}
checkLogin(token);

$('#logout').on('click',function(e) {
  e.preventDefault();
  localStorage.removeItem('jwt');
  checkLogin(token);
  window.location = '/';
})

$('#start').on('click',function(e) {
  e.preventDefault();
  window.location = '/signup';
})