// original color of the body
// (will be used for resetting the background color)
const originalColor = $('body').css('background-color');

$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    // Called function to update the name, happiness, and weight of our pet in our HTML
    checkAndUpdatePetInfoInHtml();
  
    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.sleep-button').click(clickedSleepButton);
  

    // initial greeting (happens only on first click on the pet image)
    // one() attaches an event handler that is run max 1 time for the specified event
    $('.pet-image').one('click', function() {
      message = "Hello! I'm Shadow!";
      // stop() stops the current animation
      // text() sets the text of the element to the specified message
      // css() sets the css property to the one specified in the parantheses
      // delay() adds a waiting period (a delay, in ms) before the next item in the queue is executed
      // animate() performs an animation based on css properties (it takes the css to be performed, as well as a time for how long the animation should be)
      $(".notification").stop(true, true).text(message).css("opacity", "1").delay(1500).animate({ opacity: 0 }, 1500);
    });

    // create Audio object
    const sound = new Audio('/audio/purr.mp3');
    // on mouse hover, show purr message
    // on() attaches an event handler than is run every time the specified event occurs
    $('.pet-image').on('mouseenter', function() {
      message = "Purr. Purr. Purr.";
      sound.play();
      $(".notification").stop(true, true).text(message).css("opacity", "1");
    }).on('mouseleave', function() {
      $(".notification").stop(true, true).animate({ opacity: 0 }, 1500);
      // end sound
      sound.pause(); // pause sound
      sound.currentTime = 0; // reset sound file to 0
    });
    
  })
  
    // Create a pet_info object with keys "name", "weight", "happiness" and set initial values.
    // Set this equal to variable "pet_info"
    // Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
    var pet_info = {name: "Shadow", weight: 12, happiness: 8, energy: 3};

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
      changeBackgroundColor('rgba(156, 255, 166, 0.21)');
      checkAndUpdatePetInfoInHtml();
    }
    
    // When your pet exercises, reduce its happiness and weight. 
    function clickedExerciseButton() {
      // Decrease pet happiness
      pet_info.happiness--;
      // Decrease pet weight
      pet_info.weight--;
      // Decrease pet energy
      pet_info.energy--;
      // Set message
      message = "No more, please!";
      changeBackgroundColor('rgba(87, 87, 87, 0.21)');
      checkAndUpdatePetInfoInHtml();
    }

    function clickedSleepButton(){
      // Increase pet energy
      pet_info.energy++;
      // Increase pet happiness
      pet_info.happiness++;
      // Set message
      message = "zzzzzzzzz...";
      changeBackgroundColor('rgba(187, 229, 255, 0.21)');
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
      if(pet_info.weight < 0){
        pet_info.weight = 0;
      }
      // check happiness
      if(pet_info.happiness < 0){
        pet_info.happiness = 0;
      }
      // check energy
      if(pet_info.energy < 0){
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
  


    function changeBackgroundColor(newColor){
      // change background to new color
      $('body').css('background-color', newColor);

      // wait 3000ms then change background color back to original
      setTimeout(function() {
          $('body').css('background-color', originalColor);
      }, 3000);
    }