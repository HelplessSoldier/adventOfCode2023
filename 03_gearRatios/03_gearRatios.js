const fs = require("fs");

const data = fs.readFileSync("./data.txt", "utf8");

console.log(sumPartNumbers(data));
sumGearRatios(data);

// part 1
function sumPartNumbers(data) {
  const dataArray = dataToArray(data);
  const partNumbers = getPartNumbers(dataArray);
  let res = 0;
  partNumbers.map((partNum) => (res += Number(partNum)));
  return res;
}

function sumGearRatios(data) {
  const dataArray = dataToArray(data);
  const gearRatios = getGearRatios(dataArray);
  return;
}

function getGearRatios(dataArray) {
  const arrHeight = dataArray.length;
  const arrWidth = dataArray[0].length;
  const searchDirections = getSearchDirections();

  let allPotentialGearRatios = [];
  for (let x = 0; x < arrHeight; x++) {
    for (let y = 0; y < arrWidth; y++) {
      const currentChar = dataArray[x][y];

      if (currentChar === '*') {
        let adjecentNums = [];
        for (let direction of searchDirections) {
          const searchX = x + direction[0];
          const searchY = y + direction[1];
          if (inBounds(searchX, searchY, arrWidth, arrHeight)) {
            if (isNumerical(dataArray[searchX][searchY])) {
              const num = getWholeNum(dataArray, searchX, searchY);
              if (adjecentNums.includes(num)) {
                continue;
              } else {
                adjecentNums.push(num);
              }
            }
          }
        }
        if (adjecentNums.length === 2) {
          allPotentialGearRatios.push(adjecentNums);
        }
      }
    }
  }
  console.log(allPotentialGearRatios);
}

function getPartNumbers(dataArray) {
  const arrHeight = dataArray.length;
  const arrWidth = dataArray[0].length;
  const searchDirections = getSearchDirections();

  let res = [];
  let currentNum = "";
  let partNumber = false;
  for (let x = 0; x < arrHeight; x++) {
    for (let y = 0; y < arrWidth; y++) {
      const currentChar = dataArray[x][y];

      // not in number, if search found special char, add currentNum to res
      // reset regardless
      if (currentChar === "." || isSpecialChar(currentChar)) {
        if (partNumber) {
          res.push(currentNum);
        }
        currentNum = "";
        partNumber = false;
      }

      // in a number, search for special char adjacent and add char to currentNum
      if (!isSpecialChar(currentChar) && currentChar !== ".") {
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

function getSearchDirections() {
  return [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
}

function isSpecialChar(char) {
  const specialChars = ["!", "@", "#", "$", "%", "^", "&", "*", "-", "+", "/", "="];
  if (specialChars.includes(char)) {
    return true;
  }
  return false;
}

function getWholeNum(dataArray, x, y) {
  const arrHeight = dataArray.length;
  const arrWidth = dataArray[0].length;
  // move to leftmost numerical char
  for (; ;) {
    if (!inBounds(x, y - 1, arrWidth, arrHeight)) {
      break;
    }
    const checkChar = dataArray[x][y - 1];
    if (!isNumerical(checkChar)) {
      break;
    }
    y--;
  }

  // build whole num
  let res = '';
  for (; ;) {
    if (!inBounds(x, y + 1, arrWidth, arrHeight)) {
      break;
    }
    const currentChar = dataArray[x][y];
    if (isNumerical(currentChar)) {
      res = res + currentChar;
    } else {
      break;
    }
    y++;
  }

  return Number(res);
}

function isNumerical(char) {
  const numericalChars = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  if (numericalChars.includes(char)) {
    return true;
  }
  return false;
}
