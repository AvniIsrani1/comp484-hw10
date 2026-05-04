// original color of the body
// (will be used for resetting the background color)
const originalColor = $('body').css('background-color');

// create Audio objects
const purrSound = new Audio('audio/purr.mp3');
const eatSound = new Audio('audio/eating.mp3');

$(function () { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
  // Called function to update the name, happiness, and weight of our pet in our HTML
  checkAndUpdatePetInfoInHtml();

  // When each button is clicked, it will "call" function for that button (functions are below)
  $('.treat-button').click(clickedTreatButton);
  $('.play-button').click(clickedPlayButton);
  $('.exercise-button').click(clickedExerciseButton);
  $('.sleep-button').click(clickedSleepButton);
  $('.groom-button').click(clickedGroomButton); // for hw10, new button added to keep new errors added isolated


  // initial greeting (happens only on first click on the pet image)
  // one() attaches an event handler that is run max 1 time for the specified event
  $('.pet-image').one('click', function () {
    message = "Hello! I'm Shadow!";
    console.log("Hello, I'm Shadow!"); // (1a) Message Logging: Log Info
    // stop() stops the current animation
    // text() sets the text of the element to the specified message
    // css() sets the css property to the one specified in the parantheses
    // delay() adds a waiting period (a delay, in ms) before the next item in the queue is executed
    // animate() performs an animation based on css properties (it takes the css to be performed, as well as a time for how long the animation should be)
    $(".notification").stop(true, true).text(message).css("opacity", "1").delay(1500).animate({ opacity: 0 }, 1500);
  });

  // on mouse hover, show purr message
  // on() attaches an event handler than is run every time the specified event occurs
  $('.pet-image').on('mouseenter', function () {
    message = "Purr. Purr. Purr.";
    console.warn("if you stop petting me, bad things might happen."); // (1b) Message Logging: Log Warning
    // play purring sound
    purrSound.play();
    $(".notification").stop(true, true).text(message).css("opacity", "1"); // message visible
  }).on('mouseleave', function () {
    $(".notification").stop(true, true).animate({ opacity: 0 }, 1500); // fade message out
    // end sound
    purrSound.pause(); // pause sound
    purrSound.currentTime = 0; // reset sound file to 0
    console.error("Why did you stop?"); // (1c) Message Logging: Log Error
  });

})

// Create a pet_info object with keys "name", "weight", "happiness" and set initial values.
// Set this equal to variable "pet_info"
// Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
var pet_info = { name: "Shadow", weight: 12, happiness: 8, energy: 3 };

var message = ""; // notification message

// When your pet receives a treat, add to its happiness and weight. 
function clickedTreatButton() {
  // Increase pet happiness
  pet_info.happiness++;
  // Increase pet weight
  pet_info.weight++;
  // Increase pet energy
  pet_info.energy++;
  // Set message
  message = "That was so yummy! Can I have 1 more?";
  // (1d) Message Logging: Log Table
  console.table([
    {
      when: 'now',
      happiness: pet_info.happiness,
      weight: pet_info.weight,
      energy: pet_info.energy,
    },
    {
      when: 'before',
      happiness: pet_info.happiness - 1,
      weight: pet_info.weight - 1,
      energy: pet_info.energy - 1,
    }
  ]);

  // Play eating sound for 3 seconds
  eatSound.play();
  setTimeout(function () {
    eatSound.pause(); // stop sound
    eatSound.currentTime = 0; // reset time in sound to 0
  }, 3000);
  // change background color to gray (unhappy)
  changeBackgroundColor('rgba(255, 225, 103, 0.21)');
  checkAndUpdatePetInfoInHtml();
}

// When your pet plays, add to its happiness and reduce its weight
function clickedPlayButton() {
  // Increase pet happiness
  pet_info.happiness++;
  // Decrease pet weight
  pet_info.weight--;
  // Decrease pet energy
  pet_info.energy--;
  // Set message
  message = "I'm having so much fun!";

  // (1d) Message Logging: Log Group
  const favoriteToys = 'Yarn Light Balls Feathers';
  console.group(favoriteToys);

  // (1e): Message Logging: Log Custom
  const spacing = '10px';
  const styles =
    `padding: ${spacing}; background-color: black; color: yellow; font-style: 
         italic; border: ${spacing} solid yellow; font-size: 3em;`;
  console.log('%cI am the best cat in the world!', styles);

  // make toy-image bounce up and down
  $(".toy-image").stop(true, true).animate({ top: "-20px" }, 800).animate({ top: "0px" }, 800).animate({ top: "-20px" }, 800).animate({ top: "0px" }, 800);
  // change background color to green (happy)
  changeBackgroundColor('rgba(156, 255, 166, 0.21)');
  checkAndUpdatePetInfoInHtml();
}

// When your pet exercises, reduce its happiness and weight. 
function clickedExerciseButton() {
  // (2a) View messages logged by the browser: Cause 404 network error
  fetch('audio/does-not-exist.mp3');

  // (2b) View messages logged by the browser: Cause TypeError
  document.querySelector('.exercise-button').addEventListener('click', () => {
    document.querySelector('#exercise-status').textContent = "I exercised!";
  });

  // Decrease pet happiness
  pet_info.happiness--;
  // Decrease pet weight
  pet_info.weight--;
  // Decrease pet energy
  pet_info.energy--;
  // Set message
  message = "No more, please!";
  // addClass adds the class to the element
  // here we add the 'shake' class, which has css properties (in style.css) that give a shaking animation
  $('.pet-image').addClass('shake');
  setTimeout(function () {
    // removeClass removes the specified class from the element
    $('.pet-image').removeClass('shake');
  }, 500); // 500 = wait 0.5 seconds
  // change background color to gray (unhappy)
  changeBackgroundColor('rgba(87, 87, 87, 0.21)');
  checkAndUpdatePetInfoInHtml();
}

function clickedSleepButton() {
  // Increase pet energy
  pet_info.energy++;
  // Increase pet happiness
  pet_info.happiness++;
  // Set message
  message = "zzzzzzzzz...";

  // (2c) View messages logged by the browser: Cause Violation
  const duration = 3000;
  const start = new Date().getTime();
  while (new Date().getTime() < start + duration) {
    // Block the main thread for 3 seconds.
  }

  // fadeTo adjusts the opacity of the specifed elment
  // here, over 1.5 seconds, the opacity fades to 0.2
  // then, over the next 1.5 seconds, the opacity fades back to 1
  $(".pet-image").fadeTo(1500, 0.2).fadeTo(1500, 1);
  // change background color to blue (peaceful)
  changeBackgroundColor('rgba(187, 229, 255, 0.21)');
  checkAndUpdatePetInfoInHtml();
}

// new function for HW 10 to keep errors introduced isolated from main code
function clickedGroomButton() {
  // BUG: this adds the string "1", not the number 1
  // FIX: pet_info.happiness++;
  // pet_info.happiness = pet_info.happiness + "1";
  pet_info.happiness++;
  message = "I look so fluffy now!";

  $('.pet-image').fadeTo(500, 0.7).fadeTo(500, 1); // fade cat image and back
  changeBackgroundColor('rgba(255, 200, 255, 0.21)'); // change background color
  checkAndUpdatePetInfoInHtml();
}


function checkAndUpdatePetInfoInHtml() {
  checkWeightAndHappinessBeforeUpdating();
  updatePetInfoInHtml();
  // stop keeps the animations from stacking if the button is clicked multiple times
  // the message will fade in and stay visible for 1500 ms
  // then the message will fade out
  $(".notification").stop(true, true).text(message).css("opacity", "1").delay(1500).animate({ opacity: 0 }, 1500);
}

// Fix key bugs to make sure certain key values can't go below zero. (can use conditional)
function checkWeightAndHappinessBeforeUpdating() {
  // Add conditional so if weight is lower than zero.
  // check weight
  if (pet_info.weight < 0) {
    pet_info.weight = 0;
  }
  // check happiness
  if (pet_info.happiness < 0) {
    pet_info.happiness = 0;
  }
  // check energy
  if (pet_info.energy < 0) {
    pet_info.energy = 0;
  }
}

// Updates your HTML with the current values in your pet_info object
function updatePetInfoInHtml() {
  $('.name').text(pet_info['name']);
  $('.weight').text(pet_info['weight']);
  $('.happiness').text(pet_info['happiness']);
  $('.energy').text(pet_info['energy']);
}



function changeBackgroundColor(newColor) {
  // change background to new color
  $('body').css('background-color', newColor);

  // wait 3000ms then change background color back to original
  setTimeout(function () {
    $('body').css('background-color', originalColor);
  }, 3000);
}