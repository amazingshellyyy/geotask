const $form = $('form');
const API = 'http://localhost:4000';

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
  const $email = $('#email').val();
  const $password = $('#password').val();
  const userData = {};
  const $formEle = $form.prop('elements')
  const formInput = [...$formEle].splice(0,2);
 

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
    }
  });
    if (formIsValid) {
      //send data to server
      fetch(`${API}/api/v1/signup`, {
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then(res => res.json())
        .then((data) => console.log('data',data))
        .catch(err => console.log(err))
    
    }
  
 

};


$form.on('submit', handleSignUp);