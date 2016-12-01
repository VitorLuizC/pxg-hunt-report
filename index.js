"use strict";

/**
 * Delimites line with "line breaks" and transform in an Array.
 * @param {string} text
 * @returns {Array<string>}
 */
function breakLines(text) {
  var lines = [];
  var line = "";

  for (let letter of text) {
    if (letter === "\n") {
      lines.push(line);
      line = "";
    } else {
      line += letter;
    }
  }

  return lines;
}

function format(text) {
  return breakLines(text);
}

/**
 * Simple mock for log messages.
 */
console.log(format(`
23:35 Miles Kane: Magikarp loot: a water gem.
23:35 Miles Kane: Magikarp loot: a water gem and a Magikarp fin.
`));
