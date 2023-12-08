const fs = require("fs");

class DesertGraph {
  constructor(input) {
    this.input = input;
    this.instructions = this._parseInstructions();
    this.nodesArray = this._parseInput();
    this.graph = this._populateGraph();
  }

  part1() {
    let currName = 'AAA';
    let currInstr = 0;
    let stepCount = 0;

    while (currName !== "ZZZ") {
      if (this.instructions[currInstr] === "L") {
        currName = this.graph[currName].left;
      } else {
        currName = this.graph[currName].right;
      }
      stepCount++
      currInstr++;
      if (currInstr > this.instructions.length - 1) {
        currInstr = 0;
      }
    }
    return stepCount;
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
const example1 = fs.readFileSync("./example1.txt", "utf8");
const example2 = fs.readFileSync('./example2.txt', 'utf8');

const startTime = performance.now();

const ex1Graph = new DesertGraph(example1);
const ex2Graph = new DesertGraph(example2);
const mainGraph = new DesertGraph(input);
console.log('example 1 part1: ', ex1Graph.part1());
console.log('example 2 part1: ', ex2Graph.part1());
console.log('input part 1: ', mainGraph.part1());

console.log(`Elapsed Time: ${performance.now() - startTime}ms`)
