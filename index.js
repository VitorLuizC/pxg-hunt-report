"use strict";

const breakOn = require("./breakOn.js");
const areNumbers = require("./areNumbers.js");


/**
 * Get Loot.
 * @param {string} line
 * @param {boolean} hasTimestamp
 * @returns {Array<Object>}
 */
function getLoot(line) {
  var text = line.substring(0, line.lastIndexOf("."));

  return breakOn(text, ", ", " and ");
}

/**
 * Generate a object with all data report.
 * @param {string} text
 * @return {Object}
 */
function generateReport(text) {
  var lines = breakOn(text, "\n");

  var data = lines.map(line => {
    let timestamp, player, pokemon, loot;
    const hasTimestamp = (areNumbers(line[0], line[1], line[3], line[4]) && line[2] === ":" && line[5] === " ");    
    const getTimestamp = line => line.substring(0, 5);
    const getPlayer = line => line.substring(0, line.indexOf(":", 6));
    const getPokemon = line => line.substring(0, line.indexOf(" loot: "));
    const removeTimestamp = line => line.substring(6);
    const removePlayer = line => line.substring(player.length + ": ".length);
    const removePokemon = line => line.substring(pokemon.length + " loot: ".length);

    if (hasTimestamp) {
      timestamp = getTimestamp(line);
      line = removeTimestamp(line);
    }

    player = getPlayer(line);
    line = removePlayer(line);

    pokemon = getPokemon(line);
    line = removePokemon(line);

    return {
      Timestamp: timestamp || null,
      Player: player || null,
      Pokemon: pokemon || null,
      Loot: getLoot(line)
    };
  });

  return data;
}

var report = generateReport(`
23:35 Miles Kane: Magikarp loot: a water gem.
23:35 Miles Kane: Magikarp loot: a water gem and a Magikarp fin.
21:55 Miles Kane: Venusaur loot: a bag of pollem, bottles of poison (7) and seeds (5).
`);

console.log(report);
