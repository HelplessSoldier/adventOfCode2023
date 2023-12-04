const fs = require("fs");
const readline = require("readline");

example1();
part1();

async function example1() {
  const filename = "./exampleInput.txt";
  const totalPoints = await findTotalPoints(filename);
  console.log(`Example: ${totalPoints}`);
}

async function part1() {
  const filename = "./input.txt";
  const totalPoints = await findTotalPoints(filename);
  console.log(`Part 1: ${totalPoints}`);
}

async function findTotalPoints(filename) {
  const fileStream = fs.createReadStream(filename);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let res = 0;
  for await (const line of rl) {
    res += getCurrentLinePoints(line);
  }
  return res;
}

function getCurrentLinePoints(line) {
  const { leftNums, rightNums } = getLeftAndRightNums(line);
  let res = 0;

  for (const num of rightNums) {
    if (!leftNums.includes(num)) {
      continue;
    }
    res = res === 0 ? 1 : res * 2;
  }

  return res;
}

function getLeftAndRightNums(line) {
  const splitLine = line.split(/[:|]/);
  const leftNums = splitLine[1]
    .split(" ")
    .filter((a) => a !== "")
    .map((a) => Number(a));
  const rightNums = splitLine[2]
    .split(" ")
    .filter((a) => a !== "")
    .map((a) => Number(a));
  return { leftNums, rightNums };
}
