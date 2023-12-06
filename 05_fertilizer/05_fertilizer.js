const fs = require("fs");

const exampleData = fs.readFileSync("./exampleInput.txt", "utf8");
const data = fs.readFileSync("./input.txt", "utf8");

console.log(part1(exampleData));
console.log(part1(data));
console.log(part2(exampleData));
//console.log(part2(data));

function part1(data) {
  const { seeds, maps } = parseInput(data);
  let smallest = Infinity;

  for (let seed of seeds) {
    const currentPath = seedToPath(seed, maps);
    const currentLoc = currentPath[currentPath.length - 1];
    if (currentLoc < smallest) {
      smallest = currentLoc;
    }
  }

  return smallest;
}

function part2(data) {
  const { seeds, maps } = parseInput(data);
  let ranges = seedRanges(seeds);

  for (let map of maps) {
    ranges = nextMapRanges(map, ranges);
  }

  let smallest = Infinity;
  for (let range of ranges) {
    smallest = smallest < range[0] ? smallest : range[0];
  }

  return smallest;
}

function seedRanges(seeds) {
  let seedRanges = [];
  for (let i = 0; i < seeds.length; i += 2) {
    const currentSeedRange = [seeds[i], seeds[i] + seeds[i + 1] - 1];
    seedRanges.push(currentSeedRange);
  }
  return seedRanges;
}

function nextMapRanges(map, ranges) {
  let newRanges = [];

  for (let mapRange of map) {

    const [destinationStart, sourceStart, rangeLength] = mapRange;

    const delta = destinationStart - sourceStart;
    const mapLeft = sourceStart;
    const mapRight = sourceStart + rangeLength;

    for (let range of ranges) {
      const rangeLeft = range[0];
      const rangeRight = range[1];
      const newRange = getNewRange(delta, mapRight, mapLeft, rangeLeft, rangeRight);
    }
  }
  return newRanges;
}

function getNewRange(delta, mapRight, mapLeft, rangeLeft, rangeRight) {
  const leftSideInRange = rangeLeft > mapLeft && rangeLeft < mapRight;
  const rightSideInRange = rangeRight > mapLeft && rangeRight < mapRight;

  if (!leftSideInRange || !rightSideInRange) {
    // one side is overflowing, split into 2 arrays and return them
    let leftArray;
    let rightArray;
    if (!leftSideInRange) {
      const leftArray = [rangeLeft, mapLeft];
      const rightArray = [mapLeft + delta, rangeRight + delta];
    }
    if (!rightSideInRange) {
      const leftArray = [rangeLeft + delta, mapRight + delta];
      const rightArray = [mapRight, rangeRight];
    }
    return [leftArray, rightArray];
  }

  if (leftSideInRange && rightSideInRange) {
    return [[rangeLeft + delta, rangeRight + delta]];
  }
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
