const fs = require("fs");

const example = fs.readFileSync("./example.txt", "utf8");
const input = fs.readFileSync("./input.txt", "utf8");

const startTime = performance.now();
console.log(`Part 1 ex: ` + part1(example));
console.log(`Part 1 in: ` + part1(input));
console.log(`Part 2 ex: ` + part2(example));
console.log(`Part 2 in: ` + part2(input));
console.log(`Completed in ${performance.now() - startTime}ms`)

function part1(input) {
  const inputObjects = parseInput(input);

  const marginsOfError = [];
  inputObjects.map((race) => {
    const minPress = getMinRecordBtnPress(race.time, race.dist);
    const maxPress = getMaxRecordBtnPress(race.time, race.dist);
    const currentMarginOfError = maxPress - minPress + 1;
    marginsOfError.push(currentMarginOfError);
  });

  return multiplyArr(marginsOfError);
}

function part2(input) {
  const inputObjects = parseInput(input);

  let asSingleRace = {
    time: '',
    dist: ''
  };

  inputObjects.map((obj) => {
    asSingleRace.time += String(obj.time);
    asSingleRace.dist += String(obj.dist);
  })

  asSingleRace.time = Number(asSingleRace.time);
  asSingleRace.dist = Number(asSingleRace.dist);

  const minPress = getMinRecordBtnPress(asSingleRace.time, asSingleRace.dist);
  const maxPress = getMaxRecordBtnPress(asSingleRace.time, asSingleRace.dist);
  const marginOfError = maxPress - minPress + 1;

  return marginOfError;
}

function multiplyArr(arr) {
  let res = 0;
  arr.map(num => {
    res = res === 0 ? num : res * num;
  })
  return res;
}

function getMinRecordBtnPress(time, dist) {
  for (let pressTime = 1; pressTime <= time; pressTime++) {
    if (winningBtnPress(time, dist, pressTime)) {
      return pressTime;
    }
  }
}

function getMaxRecordBtnPress(time, dist) {
  for (let pressTime = time; pressTime > 0; pressTime--) {
    if (winningBtnPress(time, dist, pressTime)) {
      return pressTime;
    }
  }
}

function winningBtnPress(time, dist, pressTime) {
  const speed = pressTime;
  const remainingTime = time - pressTime;
  const distanceTraveled = speed * remainingTime;
  return (distanceTraveled > dist);
}

function parseInput(input) {
  const numbers = input
    .split("\n")
    .filter((a) => a !== "")
    .map((entry) =>
      entry
        .split(":")[1]
        .split(" ")
        .filter((a) => a !== "")
        .map((num) => Number(num))
    );

  let inputObjects = [];
  for (let i = 0; i < numbers[0].length; i++) {
    const time = numbers[0][i];
    const dist = numbers[1][i];
    inputObjects.push({ time, dist });
  }

  return inputObjects;
}
