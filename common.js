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