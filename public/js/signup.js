const $form = $('form');
const BASE = 'http://localhost:4000';

const clearAlertMessage = ()=> {
  document.querySelectorAll('.alert').forEach(ele => {
    ele.remove();
  })
  document.querySelectorAll('.input').forEach(ele => {
    ele.removeClass();
  })  
}


const handleSignUp = ()=> {
  
  clearAlertMessage();
  event.preventDefault();
  const userData = {};
  const $formEle = $form.prop('elements')
  const formInput = [...$formEle].splice(0,2);
  console.log('formInput',formInput);
  let formIsValid = true;
  formInput.forEach(input => {
    if (input.value === '') {
      formIsValid = false;
      input.classList.add('input-error');
      input.insertAdjacentHTML('afterend', `<div class="alert">Please enter your ${input.type}</div>`)
    } else if (input.type === 'password' && input.value.length < 4) {
      clearAlertMessage();
      formIsValid = false;
      input.classList.add('input-error');
      input.insertAdjacentHTML('afterend', `<div class="alert">password must be at least 4 characters long</div>`)
    }

    if (formIsValid) {
      userData[input.name] = input.value;
      console.log('userData',userData);
    }
  });
    if (formIsValid) {
      //send data to server
      fetch(`${BASE}/api/v1/signup`, {
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then(res => res.json())
        .then((data) => {
          const jwt = data.jwt;
          localStorage.setItem('jwt', jwt);
          window.location =  '/profile';
         
        })
        .catch(err => console.log(err))
    
    }

};

$form.on('submit', handleSignUp);


function onSignIn(googleUser) {
  let profile = googleUser.getBasicProfile();
  let id_token = googleUser.getAuthResponse().id_token;
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  console.log('Token' + id_token);
  const GEmail = profile.getEmail();
  const socialUserData = {
    email: GEmail,
    GoogleToken: id_token
  };

  console.log('socialUserData',socialUserData);
  fetch(`${BASE}/api/v1/socialSignup`, {
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify(socialUserData),
      })
        .then(res => res.json())
        .then((data) => {
          console.log('data',data);
          const jwt = data.jwt;
          localStorage.setItem('jwt', jwt);
          window.location =  '/profile';
        })
        .catch(err => console.log(err))
    
}