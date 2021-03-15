// const sendAnEmail = document.getElementById('mailToWater');

const contactForm = document.querySelector('.contact-form');
let name = document.getElementById('name');
// let email = document.getElementById('email');
// let subject = document.getElementById('subject');
let message = document.getElementById('message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
   

    let formData = {
        name: name.value,
        // email: email.value,
        // subject: subject.value,
        message: message.value
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function() {
        console.log(xhr.responseText);
        if(xhr.responseText == 'success') {
            alert('Email sent');
            name.value = "";
            // email.value = "";
            // subject.value = "";
            message.value = "";
        } else {
            alert('Something went wrong!');
        }
    }

xhr.send(JSON.stringify(formData));

});


// Fetching the data from https://www.weatherapi.com/my/ using async GET request

document.getElementById('findOut').addEventListener('click', getData);


async function getData() {
    try {
      const response = await fetch('https://api.weatherapi.com/v1/current.json?key=71e54c45fad74731a88200748211202&q=Amsterdam');
      if (response.ok) {
        const jsonResponse = await response.json();
        const rainOrSun = jsonResponse.current.precip_mm;
        console.log(rainOrSun);
       
        if (rainOrSun <= 0) {
        document.getElementById('waterOrNot').innerHTML = 
        'It is not raining, send a reminder below';
        contactForm.style.display = 'block';
        document.getElementById('mainCont').classList.toggle('mainContNoRain');
        document.getElementById('displayNone').style.display = 'none';
document.getElementById('findOut').style.display = 'none';
       } else {
      document.getElementById('waterOrNot').innerHTML = `It is raining ${rainOrSun}%. No need to water my Rose`;
      document.getElementById('waterOrNot').style.color = "rgb(1, 17, 1)";
      document.getElementById('waterOrNot').style.textShadow = "2px 2px 2px #FFF";
      document.getElementById('mainCont').classList.toggle('mainContRain');
document.getElementById('displayNone').style.display = 'none';
document.getElementById('findOut').style.display = 'none';
      }
     } 
    } catch (error) {
      console.log(error);	
    };
  };