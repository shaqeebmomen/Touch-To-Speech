let Keyboard = window.SimpleKeyboard.default;

let keyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button),
  theme: "hg-theme-default hg-layout-default myTheme",
  buttonTheme: [
    {
      class: "myButton",
      buttons: "{enter} {bksp} {clear} {space}  1 2 3 4 5 6 7 8 9 0 q w e r t y u i o p a s d f g h j k l z x c v b n m"
    },
  ],
  layout: {
    'default': [
    '1 2 3 4 5 6 7 8 9 0 {bksp}',
    'q w e r t y u i o p {clear}',
    ' a s d f g h j k l {enter}',
    '  z x c v b n m',
    '{space}'
  ]},
  mergeDisplay: true,
  display: {
    '{clear}' : "clear",
    '{enter}' : "enter"

  }
});

// When the input is changed
function onChange(input) {

  // Change the visible input value to match the actual value
  document.querySelector(".input").value = input;

  // Refresh the suggestions
  var searchWords = getPrevAndCurr(input);
  getSuggestions(searchWords[0],searchWords[1]);

}

// When a button is pressed
function onKeyPress(button) {

  // If the clear button is pressed, clear the input
  if (button === "{clear}") {

    keyboard.clearInput();
    onChange(keyboard.getInput());
    
  }

  // If the enter button is pressed, speak
  if (button === "{enter}") {
    
    // Start Speaking
    var msg = new SpeechSynthesisUtterance(keyboard.getInput());

    // msg.onend = function(e) {
    //   console.log('Finished in ' + event.elapsedTime + ' seconds.');
    // };

    // Play the speech sound
    window.speechSynthesis.speak(msg);

    }
  }
