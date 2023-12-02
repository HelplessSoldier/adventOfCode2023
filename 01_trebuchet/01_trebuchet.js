// each individual line has a calibration value of the first number concat with the last;
// find the sum of all calibration values

const fs = require("fs");
const readline = require("readline");

findCalibrationSum();

async function findCalibrationSum() {
  const fileStream = fs.createReadStream("./01_input.txt");
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let callibrationSum = 0;
  for await (const line of rl) {
    const convertedLine = wordNumsToInts(line);
    const currentLineCalibration = getCalibration(convertedLine);
    callibrationSum += Number(currentLineCalibration);
  }
  console.log(callibrationSum);
}

function getCalibration(line) {
  const intChars = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  let leftNumFound = false;
  let leftNum;
  let leftPtr = 0;

  let rightNumFound = false;
  let rightNum;
  let rightPtr = line.length;

  while (!leftNum || !rightNum) {
    if (intChars.includes(line[leftPtr]) && !leftNumFound) {
      leftNum = line[leftPtr];
      leftNumFound = true;
    }
    if (intChars.includes(line[rightPtr]) && !rightNumFound) {
      rightNum = line[rightPtr];
      rightNumFound = true;
    }
    leftPtr++;
    rightPtr--;

    if (leftNum && rightNum) {
      break;
    }
  }
  return String(leftNum) + String(rightNum);
}

function wordNumsToInts(line) {
  const numberPairs = {
    twone: "21",
    sevenine: "79",
    oneight: "18",
    threeight: "38",
    nineight: "98",
    fiveight: "58",
    eighthree: "83",
    eightwo: "82",
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
    zero: "0",
  };

  const pattern = new RegExp(Object.keys(numberPairs).join("|"), "g");
  const result = line.replace(pattern, (match) => numberPairs[match]);
  return String(result);
}
