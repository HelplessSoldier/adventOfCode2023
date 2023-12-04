const fs = require("fs");
const readline = require("readline");

example1();
part1();
example2();

async function example1() {
  const filename = "./exampleInput.txt";
  const totalPoints = await findTotalPoints(filename);
  console.log(`Example 1: ${totalPoints}`);
}

async function part1() {
  const filename = "./input.txt";
  const totalPoints = await findTotalPoints(filename);
  console.log(`Part 1: ${totalPoints}`);
}

function example2() {
  const filename = "./exampleInput.txt";
  const cardCount = findTotalScratchCards(filename);
  console.log(`Example 2: ${cardCount}`);
}

function findTotalScratchCards(filename) {
  const input = fs.readFileSync(filename, "utf8");
  const lines = input.split("\n").filter((a) => a !== "");
  console.log(lines);
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
  const { _, leftNums, rightNums } = splitLine(line);
  let res = 0;

  for (const num of rightNums) {
    if (!leftNums.includes(num)) {
      continue;
    }
    res = res === 0 ? 1 : res * 2;
  }

  return res;
}

function splitLine(line) {
  const splitLine = line.split(/[:|]/);
  const gameNum = Number(splitLine[0].split(" ")[1]);
  const leftNums = splitLine[1]
    .split(" ")
    .filter((a) => a !== "")
    .map((a) => Number(a));
  const rightNums = splitLine[2]
    .split(" ")
    .filter((a) => a !== "")
    .map((a) => Number(a));
  return { gameNum, leftNums, rightNums };
}
