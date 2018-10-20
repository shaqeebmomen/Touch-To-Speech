// Called when a button is pressed
//  a is the suggestion button that is pressed
function appendContentsToBox(a) {

    // Get the current value in the box
    var curr = keyboard.getInput();
    
    // Make the value into an array of words and remove the last word
    curr = curr.split(" ");
    curr.pop();
    
    // Put the words into a new variable
    var newStr = "";
    
    for (var i = 0; i < curr.length; i++) {
        newStr += curr[i] + " ";
    }
    
    // Append the suggestion to the string
    newStr += a.innerHTML + " ";
    
    // Set the textbox to the new computed value
    keyboard.setInput(newStr);

    // Update the displayed value
    onChange(keyboard.getInput());
    
}