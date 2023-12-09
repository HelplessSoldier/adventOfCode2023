const fs = require("fs");

function lcmOfArray(array) {
  function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
  }
  function lcm(a, b) {
    return (a * b) / gcd(a, b);
  }
  return array.reduce((acc, num) => lcm(acc, num), 1);
}

class DesertGraph {
  constructor(input) {
    this.input = input;
    this.instructions = this._parseInstructions();
    this.nodesArray = this._parseInput();
    this.graph = this._populateGraph();
  }

  part1() {
    let currName = "AAA";
    let currInstr = 0;
    let stepCount = 0;

    while (currName !== "ZZZ") {
      if (this.instructions[currInstr] === "L") {
        currName = this.graph[currName].left;
      } else {
        currName = this.graph[currName].right;
      }
      stepCount++;
      currInstr++;
      if (currInstr > this.instructions.length - 1) {
        currInstr = 0;
      }
    }
    return stepCount;
  }

  part2() {
    const startPoints = this._getP2StartPoints();
    let stepCounts = [];
    startPoints.map((startPoint) => {
      stepCounts.push(this._getP2StepCount(startPoint))
    })
    return lcmOfArray(stepCounts);
  }

  _getP2StepCount(startPoint) {
    let currName = startPoint;
    let currInstr = 0;
    let stepCount = 0;

    while (currName[2] !== "Z") {
      if (this.instructions[currInstr] === "L") {
        currName = this.graph[currName].left;
      } else {
        currName = this.graph[currName].right;
      }
      stepCount++;
      currInstr++;
      if (currInstr > this.instructions.length - 1) {
        currInstr = 0;
      }
    }
    return stepCount;
  }

  _getP2StartPoints() {
    let startPoints = [];
    this.nodesArray.map((node) => {
      const name = node[0];
      if (name[2] === "A") {
        startPoints.push(name);
      }
    })
    return startPoints;
  }

  _populateGraph() {
    const graphMap = {};
    this.nodesArray.forEach(([name, leftname, rightname]) => {
      graphMap[name] = { left: leftname, right: rightname };
    });
    return graphMap;
  }

  _parseInput() {
    let linesArr = [];
    const lines = this.input.split("\n").filter((a) => a !== "");
    lines.shift();
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const cleanedLine = line.replace(/[)(=,]/g, "");
      const splitLine = cleanedLine.split(" ").filter((a) => a !== "");
      linesArr.push(splitLine);
    }
    return linesArr;
  }

  _parseInstructions() {
    return this.input.split("\n")[0];
  }
}

const input = fs.readFileSync("./input.txt", "utf8");

const startTime = performance.now();
const mainGraph = new DesertGraph(input);
console.log("input part 1: ", mainGraph.part1());
console.log('input part 2: ', mainGraph.part2());
console.log(`Elapsed Time: ${performance.now() - startTime}ms`);
