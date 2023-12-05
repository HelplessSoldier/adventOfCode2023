// map is in form  <int int int>
// first num is destination range start
// second is source range start
// last is the range of both

// so 50 98 2 lines up as
// 98, 99
//  ↓   ↓
// 50, 51

// part 1:
// find the lowest location value for the seed list/map

const fs = require("fs");

const exampleData = fs.readFileSync("./exampleInput.txt", "utf8");
const data = fs.readFileSync("./input.txt", "utf8");

console.log(part1(exampleData));
console.log(part1(data));

function part1(data) {
  const { seeds, maps } = parseInput(data);
  let seedPaths = [];
  for (let seedNumber of seeds) {
    const seedPath = seedToPath(seedNumber, maps);
    seedPaths.push(seedPath);
  }

  let smallest = Infinity;
  for (let path of seedPaths) {
    const location = path[path.length - 1];
    if (location < smallest) {
      smallest = location;
    }
  }
  return smallest;
}

function seedToPath(seedNumber, maps) {
  let path = [seedNumber];

  for (let map of maps) {
    let foundMatch = false;
    for (let range of map) {
      const [destinationStart, sourceStart, rangeLength] = range;
      const checkNum = path[path.length - 1];
      if (isInRange(sourceStart, rangeLength, checkNum)) {
        const deltaFromStart = checkNum - sourceStart;
        path.push(destinationStart + deltaFromStart);
        foundMatch = true;
        break;
      }
    }
    if (!foundMatch) {
      path.push(path[path.length - 1]);
    }
  }
  return path;
}

function isInRange(sourceStart, rangeLength, checkNumber) {
  if (checkNumber >= sourceStart && checkNumber <= sourceStart + rangeLength) {
    return true;
  }
  return false;
}

function parseInput(data) {
  // get seeds and maps into arrays of nums
  const splitData = data.split(/\n\s*\n/);

  const seeds = splitData[0]
    .split(":")[1]
    .split(" ")
    .filter((a) => a !== "")
    .map((a) => Number(a));

  const mapsStr = splitData.slice(1).map((map) => map.split(":")[1].trim());
  let maps = [];

  for (let mapstr of mapsStr) {
    let mapArr = mapstr.split("\n");
    for (let i = 0; i < mapArr.length; i++) {
      mapArr[i] = mapArr[i].split(" ").map(Number);
    }
    maps.push(mapArr);
  }
  return { seeds, maps };
}
