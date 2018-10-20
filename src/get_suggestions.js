
// This is the object representing the request made to the server
//  for the suggestions
var suggestHTTPRequest;

// There are three suggestion boxes to display suggestions
const MAX_SUGGESTIONS = 3;


// This is the function that processes the suggestion data returned
//  from datamuse, setting up new autocomplete buttons
function processSuggestionResponse() {

    // Process the returned text into a list of objects
    var listOfResultObj = JSON.parse(this.responseText);

    // Make an array to extract the words into
    var words = new Array();

    // Extract the max number of words or the number of words returned,
    //  whichever is smaller
    var numWords = listOfResultObj.length < MAX_SUGGESTIONS? listOfResultObj.length: MAX_SUGGESTIONS;

    var i;
    for (i = 0; i < numWords; i++) {
        // Append the word to the function
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
        words.push(listOfResultObj[i].word);
    }

    // Clear current value of buttons
    document.getElementById("predict1").innerHTML = "";
    document.getElementById("predict2").innerHTML = "";
    document.getElementById("predict3").innerHTML = "";

    // Put the data into the buttons:
    //  Note that the switch cases run into each other, so that if 2
    //  words suggestions are available, then 2 boxes are filled
    switch(numWords) {
        case 3:
            document.getElementById("predict1").innerHTML = words[2]; // Left - Fill last
        case 2:
            document.getElementById("predict3").innerHTML = words[1] // Right
        case 1:
            document.getElementById("predict2").innerHTML = words[0] // Middle - Fill first
            break;
    }

}



function getSuggestions(previousWord, currentWord) {


    suggestHTTPRequest = new XMLHttpRequest();

    // Connect the request to an event listener so that it runs the function when it gets a response
    //  https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
    suggestHTTPRequest.addEventListener("load", processSuggestionResponse);

    // Open and send an HTTP request to the datamuse server with the given words
    //  https://www.w3schools.com/js/js_json_parse.asp
    //  https://stackoverflow.com/questions/247483/http-get-request-in-javascript
    suggestHTTPRequest.open('GET', "https://api.datamuse.com/words?lc=" + previousWord + "&sp=" + currentWord + "*");
    suggestHTTPRequest.send();

}


// Extracts the previous and current words from the text entered in the text box
function getPrevAndCurr(input) {

    // Get a copy of the string through slicing
    var toAnalyse = input.slice(0).split(" ");

    var current, previous

    try {

        current = toAnalyse[toAnalyse.length - 1];

        try {
            previous = toAnalyse[toAnalyse.length - 2];
        } catch {
            previous = "";
        }

    } catch {
        current = "";
    }

    return [previous, current];

}
