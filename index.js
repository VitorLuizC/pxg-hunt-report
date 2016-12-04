"use strict";

const { breakOn, areNumbers } = require("./lib");

// 21:55 Miles Kane: Venusaur loot: a bag of pollem, bottles of poison (7) and seeds (5).

/**
 * @param {string} line
 * @returns {boolean}
 */
function hasTimestamp(line) {
  return (areNumbers(line[0], line[1], line[3], line[4]) && line[2] === ":" && line[5] === " ");
}

exports.hasTimestamp = hasTimestamp;

/**
 * Get Timestamp.
 * @param {string} line
 * @returns {string}
 */
function getTimestamp(line) {
  if (!hasTimestamp(line))
    return null;
  return line.substring(0, 5);
}

exports.getTimestamp = getTimestamp;

/**
 * @param {string} line
 */
function getPlayer(line) {
  if (hasTimestamp(line))
    return line.substring(6, line.indexOf(": "));
  return line.substring(0, line.indexOf(": "));
}

exports.getPlayer = getPlayer;

/**
 * @param {string} line
 */
function getPokemon(line) {
  var player = getPlayer(line);
  var start = player.length + ": ".length;

  if (hasTimestamp(line))
    start += 6;
  return line.substring(start, line.indexOf(" loot: ", start));
}

/**
 * Get list of all pokémon loot.
 * @param {string} line
 */
function getLoot(line) {
  var player = getPlayer(line);
  var pokemon = getPokemon(line);
  var start = player.length + ": ".length + pokemon.length + " loot: ".length;


  if (hasTimestamp(line))
    start += 6;

  line = line.substring(start, line.indexOf(".", start));

  var loots = [];
  var items = line.split(", ");

  items.forEach(item => item.split(" and ").forEach(item => loots.push(item)));

  return loots;
}

exports.getLoot = getLoot;

/**
 * Generate a object with all data report.
 * @param {string} text
 * @return {Object}
 */
function generateReport(text) {
  var lines = breakOn(text, "\n");

  var data = lines.map(line => {
    return {
      Timestamp: getTimestamp(line),
      Player: getPlayer(line),
      Pokemon: getPokemon(line),
      Loot: getLoot(line)
    };
  });

  return data;
}

exports.generateReport = generateReport;

var report = generateReport(`
23:35 Miles Kane: Magikarp loot: a water gem.
23:35 Miles Kane: Magikarp loot: a water gem and a Magikarp fin.
21:55 Miles Kane: Venusaur loot: a bag of pollem, bottles of poison (7) and seeds (5).
`);

console.log(report);
