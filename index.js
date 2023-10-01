//Animation Cards
let animation = document.querySelectorAll('.animation');

function showScroll(){
    let scrollTop = document.documentElement.scrollTop;
    for (let i=0; i < animation.length; i++){
        let heightAnimation = animation[i].offsetHeight;
        if(heightAnimation - -450 < scrollTop){
            animation[i].style.opacity = 1;
            animation[i].classList.add('showUp');
        }
    }
}

window.addEventListener('scroll', showScroll);

/*timeline*/

function qs(selector,all=false){
    return all 
    ? document.querySelectorAll(selector)
     : document.querySelector(selector);
}

const sections = qs(".time-line-description",true);
const timeline = qs(".timeline");
const line = qs(".line");
line.style.bottom = 'calc(100% - 20px)';
let prevScrollY = window.scrollY;
let up,down;
let full = false;
let set = 0;
const targetY = window.innerHeight * 0.8;

function scrollHandler(e){
    const {scrollY} = window;
    up= scrollY < prevScrollY;
    down = !up;
    const timelineRect = timeline.getBoundingClientRect();
    const lineRect = line.getBoundingClientRect();
    const dist = targetY-timelineRect.top ;

    if(dist && !full){
        set = Math.max(set,dist);
        line.style.bottom = `calc(100% - ${set}px)`;
    }
    if(dist> timeline.offsetHeight +50 && !full){
        full = true;
        line.style.bottom = `-50px`;

    }
    sections.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if(rect.top + item.offsetHeight/5< targetY){
            item.classList.add('show-me');
        }
    });
    prevScrollY = window.scrollY;
}

scrollHandler();
line.style.display = 'block';
window.addEventListener('scroll',scrollHandler);

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


// Get a reference to the header element
const header = document.querySelector('.header');

// Variable to track if the header is currently hidden
let isHeaderHidden = false;

// Variable to store the initial cursor position
let initialCursorY = null;

// Function to show the header when the cursor moves up
function showHeaderOnMouseMove(e) {
    if (initialCursorY === null) {
        initialCursorY = e.clientY;
        return;
    }

    if (e.clientY < initialCursorY && isHeaderHidden) {
        header.style.transform = 'translateY(0)';
        isHeaderHidden = false;
        setTimeout(() => {
            header.style.transform = 'translateY(-100%)';
            isHeaderHidden = true;
        }, 3000); // 3 seconds
    }

    initialCursorY = e.clientY;
}

// Add an event listener for the "mousemove" event to show the header when the cursor moves up
document.addEventListener('mousemove', showHeaderOnMouseMove);

// Function to hide the header when scrolling down and scrolling up
function hideHeaderOnScroll() {
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition > 0 && currentScrollPosition > prevScrollPosition && !isHeaderHidden) {
        header.style.transform = 'translateY(-100%)';
        isHeaderHidden = true;
    } else if (currentScrollPosition < prevScrollPosition && isHeaderHidden) {
        header.style.transform = 'translateY(0)';
        isHeaderHidden = false;
    }

    prevScrollPosition = currentScrollPosition;
}

// Add an event listener for the "scroll" event to hide the header when scrolling down and scrolling up
let prevScrollPosition = 0;
window.addEventListener('scroll', hideHeaderOnScroll);

// Function to keep the header fixed at the top
function fixHeader() {
    header.style.position = 'fixed';
    header.style.top = '0';
}

// Call the function to fix the header
fixHeader();



var typingEffect = new Typed(".randil", {
    strings: ["Randil","Randil","undergraduate", " Full Stack Developer","3D Designer"],
    loop: true,
    typeSpeed: 100,
    backSpeed: 80,
    backDelay: 2000,
  });

  // Function to change text with typing effect
  function typeText(element, text, index, speed, callback) {
    if (index <= text.length) {
      element.textContent = text.substring(0, index);
      index++;
      setTimeout(function () {
        typeText(element, text, index, speed, callback);
      }, speed);
    } else {
      setTimeout(callback, 3000); // Keep the text for 3 seconds before typing the next text
    }
  }

  // Call the typeText function after the Typed.js finishes
  typingEffect.options.callback = function () {
    const textContainer = document.querySelector(".randil");
    typeText(textContainer, typingEffect.strings[typingEffect.currentEl], 0, 100, function () {
      setTimeout(function () {
        typingEffect.deleteAll();
        typingEffect.start();
      }, 3000); // Wait for 3 seconds before starting the next Typed.js loop
    });
  };