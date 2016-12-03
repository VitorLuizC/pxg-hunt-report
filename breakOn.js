"use strict";

/**
 * Delimites lines with char and transform in an Array.
 * @param {string} text
 * @param {string} delimiter
 * @returns {Array<string>}
 */
function breakOn(text, delimiter) {
  var lines = [];
  var line = "";

  for (let letter of text) {
    if (letter === delimiter) {
      let isValidLine = (line !== "");

      if (isValidLine)
        lines.push(line);
      line = "";
    } else {
      line += letter;
    }
  }

  return lines;
}

module.exports = breakOn;
