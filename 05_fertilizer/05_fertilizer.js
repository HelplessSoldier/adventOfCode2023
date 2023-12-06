const fs = require("fs");

const exampleData = fs.readFileSync("./exampleInput.txt", "utf8");
const data = fs.readFileSync("./input.txt", "utf8");

console.log(part1(exampleData));
console.log(part1(data));
console.log(part2(exampleData));
console.log(part2(data));

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

  let smallest = Infinity;
  let cycle = 0;
  let startTime = performance.now();
  for (let i = 0; i < seeds.length; i += 2) {
    const seedStart = seeds[i];
    const seedEnd = seeds[i] + seeds[i + 1];
    for (let seedNumber = seedStart; seedNumber < seedEnd; seedNumber++) {
      cycle++;
      const currentPath = seedToPath(seedNumber, maps);
      const currentLoc = currentPath[currentPath.length - 1];
      smallest = currentLoc < smallest ? currentLoc : smallest;
      const elapsedTime = performance.now() - startTime;
      const minuites = Math.floor((elapsedTime / 1000 / 60) << 0);
      const seconds = Math.floor((elapsedTime / 1000) % 60);
      console.log(
        `Current: ${currentLoc} smallest: ${smallest} progress: ${(
          (cycle / 1951135283) *
          100
        ).toPrecision(3)}% elapsedTime: ${minuites}:${seconds}`
      );
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
