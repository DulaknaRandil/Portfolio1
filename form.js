//Form
document.addEventListener('DOMContentLoaded', function()  {
    const email = {
        email : "",
        subject : "",
        message : "",
    };

    const inputEmail = document.querySelector('#email');
    const inputSubject = document.querySelector('#subject');
    const inputMessage = document.querySelector('#message');
    const form = document.querySelector('#form');
    const btnSubmit = document.querySelector('#form button [type="submit"]');
    const btnReset = document.querySelector('#form button [type="reset"]');
    const spinner = document.querySelector('#spinner');

    inputEmail.addEventListener('input', validate);
    inputSubject.addEventListener('input', validate);
    inputMessage.addEventListener('input', validate);

    form.addEventListener("submit",sendEmail);

    btnReset.addEventListener("click", function (e) {
        e.preventDefault();
        resetForm();
        
    });

    function sendEmail(e){
        e.preventDefault();
        spinner.classList.remove('hideSpinner');
       
            
           setTimeout(() => {
            
            spinner.classList.add('hideSpinner');
            resetForm();
            
            const alertSucces = document.createElement('P');
            alertSucces.textContent = 'Message Sent!';
            alertSucces.classList.add('messageSent');

            form.appendChild(alertSucces);
            setTimeout(() => {
                alertSucces.remove();
            }, 3000);
            
            }, 3000);
        
    }
function validate(e){
    if(e.target.value.trim() === ""){
        showAlert(`⚠️ This field ${e.target.id} is required`,
         e.target.parentElement);

         email[e.target.name] = "";
         checkEmail();
         return;
    }
    if(e.target.id === "email"&& !validateEmail(e.target.value)){
        showAlert('⚠️ Please enter a valid email',
         e.target.parentElement);
         email[e.target.name] = "";
         checkEmail();
         return;
    }

    cleanAlert(e.target.parentElement);
    email[e.target.name] = e.target.value.trim().toLowerCase();
    checkEmail();

}

function showAlert(message,reference){
    cleanAlert(reference);
    const error = document.createElement('P');
    error.textContent = message;
    error.classList.add('error-form');
    reference.appendChild(error);
}

function cleanAlert(reference){
    const alert = reference.querySelector('.error-form');
    if(alert){
        alert.remove();
    }
}

function validateEmail(email){
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/; 
    const result = regex.test(email);
    return result;
}

function checkEmail() {
    const btnSubmit = document.querySelector('#form button[type="submit"]');
    
    if (!btnSubmit) {
        // Handle the case where the submit button cannot be found
        console.error("Submit button not found.");
        return;
    }

    if (Object.values(email).includes("")) {
        btnSubmit.disabled = true;
    } else {
        btnSubmit.disabled = false;
    }
}

function resetForm(){
email.email = "";
email.subject = "";
email.message = "";

form.reset();
checkEmail();
}

});



