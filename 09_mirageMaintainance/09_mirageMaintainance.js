const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf8");
const example = fs.readFileSync("./example.txt", "utf8");

const startTime = performance.now();
console.log(`part1 ex: ${part1(example)}`);
console.log(`part1 in: ${part1(input)}`);
console.log(`Elapsed time: ${performance.now() - startTime}`);

function part1(input) {
  const lines = parseInput(input)
  let total = 0;
  for (let line of lines) {
    total += extrapolateLine(line);
  }
  return total;
}

function extrapolateLine(line) {
  const expandedLine = expandLine(line);
  const nextNum = getNextNum(expandedLine);
  return nextNum;
}

function expandLine(line) {
  let pattern = [line];
  let lastLine = line;
  while (!allZeros(lastLine)) {
    const currentPattern = getNextPattern(lastLine);
    pattern.push(currentPattern);
    lastLine = currentPattern;
  }
  return pattern.reverse();
}

function getNextNum(expandedLine) {
  let rollingSum = 0;
  for (let i = 0; i < expandedLine.length; i++) {
    const endnumIdx = expandedLine[i].length - 1;
    const endnum = expandedLine[i][endnumIdx];
    rollingSum += endnum;
  }
  return rollingSum;
}

function getNextPattern(line) {
  let pattern = [];
  let last;
  for (let num of line) {
    if (last === undefined) {
      last = num;
      continue;
    }
    pattern.push(num - last);
    last = num;
  }
  return pattern;
}

function parseInput(input) {
  const lines = input.split("\n").filter((a) => a !== "");
  let splitLines = [];
  lines.forEach(line => {
    const splitLine = line.split(' ');
    for (let i = 0; i < splitLine.length; i++) {
      splitLine[i] = Number(splitLine[i]);
    }
    splitLines.push(splitLine);
  })
  return splitLines;
}

function allZeros(line) {
  for (let num of line) {
    if (num !== 0) {
      return false;
    }
  }
  return true;
}
