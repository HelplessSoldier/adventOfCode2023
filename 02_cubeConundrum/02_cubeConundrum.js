// input is a list of games played where a random assortment of colored cubes is pulled from a bag
// there are only cubes: 12 red, 13 green, 14 blue.
// some games are impossible as the elf pulled more cubes of one or more colors than exist
// find the sum of all the possible games id's ommiting the impossible ones

const fs = require("fs");
const readline = require("readline");

findSumOfPossibleGameIds("./data.txt");
sumPowerFewestCubes("./data.txt");

// part one
async function findSumOfPossibleGameIds(filename) {
  const fileStream = fs.createReadStream(filename);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let idSum = 0;
  for await (const line of rl) {
    const lineObject = _gameLineToObject(line);
    if (
      lineObject.maxRed > 12 ||
      lineObject.maxGreen > 13 ||
      lineObject.maxBlue > 14
    ) {
      continue;
    }
    idSum += lineObject.gameNumber;
  }
  console.log(idSum);
}

// part two
async function sumPowerFewestCubes(filename) {
  const fileStream = fs.createReadStream(filename);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let powSum = 0;
  for await (const line of rl) {
    const lineObject = _gameLineToObject(line);
    const currentPow =
      lineObject.maxRed * lineObject.maxBlue * lineObject.maxGreen;
    powSum += currentPow;
  }
  console.log(powSum);
}

/** take a line and return an object with the game number
 * and the max value of each color
 * @param {String} line in form: Game <game#>: <colorCount> <color> ... ; ...
 * @return {Object} an object with the following properties
 *  - {Number} gameNumber
 *  - {Number} maxRed
 *  - {Number} maxGreen
 *  - {Number} maxBlue
 **/
function _gameLineToObject(line) {
  const gameString = line.split(/:(.*)/s)[0];
  const countString = line.split(/:(.*)/s)[1];
  const gameNumber = Number(gameString.split(" ")[1]);

  const maxRed = _getMaxCountOfColor(countString, "red");
  const maxGreen = _getMaxCountOfColor(countString, "green");
  const maxBlue = _getMaxCountOfColor(countString, "blue");

  return {
    gameNumber,
    maxRed,
    maxGreen,
    maxBlue,
  };
}

function _getMaxCountOfColor(countString, color) {
  const countStringArray = countString.split(/\s|,|;/);
  let maxSeen = 0;
  for (let i = 0; i < countStringArray.length; i++) {
    if (countStringArray[i] === color) {
      maxSeen =
        maxSeen > Number(countStringArray[i - 1])
          ? maxSeen
          : Number(countStringArray[i - 1]);
    }
  }
  return maxSeen;
}
