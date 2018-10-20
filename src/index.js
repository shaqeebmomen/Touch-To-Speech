let Keyboard = window.SimpleKeyboard.default;

let keyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button),
  theme: "hg-theme-default hg-layout-default myTheme"


});

console.log(keyboard);

// document.querySelector(".input").addEventListener("change", event => {
//   keyboard.setInput(event.target.value);
// });


function onChange(input) {
  document.querySelector(".input").value = input;
  console.log("Input changed", input);

  var searchWords = getPrevAndCurr(input);
  getSuggestions(searchWords[0], searchWords[1]);

}

function onKeyPress(button) {
  console.log("Button pressed", button);

  /**
   * If you want to handle the shift and caps lock buttons
   */
  if (button === "{shift}" || button === "{lock}") {
    handleShift();
  }
  if (button === "{enter}") {
    console.log("THE ENTER KEY WAS PRESSED");
    //Put the text to speech stuff here
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
    layout: {
      'default': [
      '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
      '{clear} q w e r t y u i o p [ ] \\',
      '{lock} a s d f g h j k l ; \' {enter}',
      '{shift} z x c v b n m , . / {shift}',
      '.com @ {space}'
      ],
      'shift': [
      '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
      '{tab} Q W E R T Y U I O P { } |',
      '{lock} A S D F G H J K L : " {enter}',
      '{shift} Z X C V B N M < > ? {shift}',
      '.com @ {space}'
      ]
    },
  });
}
