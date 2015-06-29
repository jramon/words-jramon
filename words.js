var fs = require('fs');

function words (query) {
  // convert our query to an array of unique letters
  var letters = query.split('').filter(function (val, index, array) {
                  return array.indexOf(val) === index;
                });

  // Set default messages here
  var messages = {
    500: "This is a default 500 message error"
  };
  /**
  *  Validates the precence of 3 or more unique characters;
  *  @return Boolean whether the query has 3 or more unique characters
  */
  function validate (letters) {
    if (letters.length < 3) {
      messages[400] = "Please provide 3 or more unique characters";
      return false;
    } else {
      return true;
    }
  }
  /**
  *  Reads the content of the dictionary
  *  @return Array The filtered words from dictionary
  */
  function findWords() {
    var dictionary = fs.readFileSync('complete.txt', 'utf8');

    return dictionary.split('\n').filter(filterWords);
  }
  /**
  *  "Filter" logic for the words that contain all (every) the required letters
  *  @return Array The filtered words from the input based on the letters from the query
  */
  function filterWords (word, index, array) {
    return letters.every(function (letter, i) {
      return word.indexOf(letter) > -1;
    });
  }

  return {
    isValid: validate(letters),
    findWords: findWords,
    messages: messages
  }
}

module.exports  = words;
