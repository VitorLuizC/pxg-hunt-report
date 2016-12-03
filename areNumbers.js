"use strict";

/**
 * Check if all values are numbers.
 * @param {...any} values
 * @returns {boolean}
 */
function areNumbers(...values) {
  for (let value of values) {
    if (isNaN(value)) return false;
    continue;
  }

  return true;
}

module.exports = areNumbers;
