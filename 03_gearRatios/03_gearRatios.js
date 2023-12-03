const fs = require("fs");

const data = fs.readFileSync("./data.txt", "utf8");

console.log(sumPartNumbers(data));

// part 1
function sumPartNumbers(data) {
  const dataArray = dataToArray(data);
  const partNumbers = getPartNumbers(dataArray);
  let res = 0;
  partNumbers.map((partNum) => res += Number(partNum));
  return res;
}

function getPartNumbers(dataArray) {
  const arrHeight = dataArray.length;
  const arrWidth = dataArray[0].length;
  const searchDirections = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  let res = [];
  let currentNum = '';
  let partNumber = false;
  for (let x = 0; x < arrHeight; x++) {
    for (let y = 0; y < arrWidth; y++) {

      const currentChar = dataArray[x][y];

      // not in number, if search found special char, add currentNum to res
      // reset regardless
      if (currentChar === '.' || isSpecialChar(currentChar)) {
        if (partNumber) {
          res.push(currentNum);
        }
        currentNum = '';
        partNumber = false;
      }

      // in a number, search for special char adjacent and add char to currentNum
      if (!isSpecialChar(currentChar) && currentChar !== '.') {
        currentNum = currentNum + currentChar;
        for (let direction of searchDirections) {
          const searchX = direction[0] + x;
          const searchY = direction[1] + y;
          if (inBounds(searchX, searchY, arrWidth, arrHeight)) {
            if (isSpecialChar(dataArray[searchX][searchY])) {
              partNumber = true;
            }
          }
        }
      }
    }
  }
  return res;
}

function dataToArray(data) {
  let res = [];
  let lineArr = [];
  for (let char of data) {
    if (char === "\n") {
      res.push(lineArr);
      lineArr = [];
    } else {
      lineArr.push(char);
    }
  }
  if (lineArr.length > 0) {
    res.push(lineArr);
  }
  return res;
}

function inBounds(x, y, width, height) {
  if (x < 0 || y < 0 || x >= height || y >= width) {
    return false;
  }
  return true;
}

function isSpecialChar(char) {
  if (
    char === '!' ||
    char === '@' ||
    char === '#' ||
    char === '$' ||
    char === '%' ||
    char === '^' ||
    char === '&' ||
    char === '*' ||
    char === '-' ||
    char === '+' ||
    char === '/' ||
    char === '='
  ) {
    return true
  }
  return false;
}
