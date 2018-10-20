let Keyboard = window.SimpleKeyboard.default;

let keyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button),
  theme: "hg-theme-default hg-layout-default myTheme",
  buttonTheme: [
    {
      class: "myButton",
      buttons: " q w e r t y u i o p a s d f g h j k l z x c v b n m"
    },
  ],
  layout: {
    'default': [
    '1 2 3 4 5 6 7 8 9 0 - = {bksp}',
    ' q w e r t y u i o p {clear} ',
    'a s d f g h j k l {enter}',
    'z x c v b n m {shift}',
    '{space}'
  ]/*,
    'shift': [
    '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
    '{tab} Q W E R T Y U I O P { } |',
    '{lock} A S D F G H J K L : " {enter}',
    '{shift} Z X C V B N M < > ? {shift}',
    '.com @ {space}'
  ]*/
  },
  display: {
    '{clear}' : "clear"

  }
});

console.log(keyboard);

// document.querySelector(".input").addEventListener("change", event => {
//   keyboard.setInput(event.target.value);
// });

function onChange(input) {
  document.querySelector(".input").value = input;
  console.log("Input changed", input);
}

function onKeyPress(button) {
  console.log("Button pressed", button);

  /**
   * If you want to handle the shift and caps lock buttons
   */
  // if (button === "{shift}" || button === "{lock}") {
  //   handleShift();
  // }
  if (button === "{clear}") {
    console.log("clearing input");
    keyboard.clearInput();
    onChange(keyboard.getInput());

  }
  if (button === "{enter}") {
    console.log("THE ENTER KEY WAS PRESSED");
    //Start Speaking
    var msg = new SpeechSynthesisUtterance(keyboard.getInput());
    //var voices = window.speechSynthesis.getVoices();
    // msg.voice = voices[10]; // Note: some voices don't support altering params
    // msg.voiceURI = 'native';
    // msg.volume = 1; // 0 to 1
    // msg.rate = 1; // 0.1 to 10
    // msg.pitch = 2; //0 to 2
    // msg.text = keyboard.getInput();
    // msg.lang = 'en-US';

    msg.onend = function(e) {
      console.log('Finished in ' + event.elapsedTime + ' seconds.');
    };

    window.speechSynthesis.speak(msg);
    //End Speaking
    }
  }


function handleShift() {
  console.log("Shifting");
  let currentLayout = keyboard.options.layoutName;
  if (currentLayout === 'default') {
    currentLayout = 'shift';
  }
  else if (currentLayout = 'shift') {
    currentLayout = 'default'
  }
  // let shiftToggle = currentLayout === 'default' ? 'shift' : 'default';

  keyboard.setOptions({
    layoutName: currentLayout,

  });
}
