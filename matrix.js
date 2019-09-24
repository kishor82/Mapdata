"use strict";
const fs = require("fs");
let matrix = [];
let nodes = [];
let edges = [];
let corners = [];
let boundries = [];
let middle = [];
let elements = {};
// size of matrix;
console.log("mapdata.json  is generating.........");
const size = 7;
for (let i = 0; i < size; i++) {
  matrix[i] = new Array(size);
}

for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix.length; j++) {
    matrix[i][j] = `${i}${j}`;
    nodes.push({ data: { id: `N${matrix[i][j]}` } });
    //middle areas
    if (i - 1 !== -1 && j + 1 !== matrix.length) {
      if (j !== 0 && i !== matrix.length - 1) {
        //Add logic here for middle area nodes, which all have 8 adjacent nodes
        middle.push(matrix[i][j]);
        edges.push({
          data: {
            id: `${matrix[i][j]}E`,
            source: `N${i}${j}`,
            target: `N${i}${j + 1}`
          }
        });
        edges.push({
          data: {
            id: `${matrix[i][j]}W`,
            source: `N${i}${j}`,
            target: `N${i}${j - 1}`
          }
        });
        edges.push({
          data: {
            id: `${matrix[i][j]}S`,
            source: `N${i}${j}`,
            target: `N${i + 1}${j}`
          }
        });
        edges.push({
          data: {
            id: `${matrix[i][j]}N`,
            source: `N${i}${j}`,
            target: `N${i - 1}${j}`
          }
        });
        edges.push({
          data: {
            id: `${matrix[i][j]}NW`,
            source: `N${i}${j}`,
            target: `N${i - 1}${j - 1}`
          }
        });
        edges.push({
          data: {
            id: `${matrix[i][j]}SE`,
            source: `N${i}${j}`,
            target: `N${i + 1}${j + 1}`
          }
        });
        edges.push({
          data: {
            id: `${matrix[i][j]}NE`,
            source: `N${i}${j}`,
            target: `N${i - 1}${j + 1}`
          }
        });
        edges.push({
          data: {
            id: `${matrix[i][j]}SW`,
            source: `N${i}${j}`,
            target: `N${i + 1}${j - 1}`
          }
        });
      }
    }

    // Extract corner and boundry nodes
    if (i - 1 === -1 || i + 1 === matrix.length) {
      boundries.push(matrix[i][j]);
      if (i === j) {
        // Add logic for corner nodes , all have 3 adjacent nodes
        corners.push(matrix[i][j]);
        boundries.pop(matrix[i][j]);
        if (i === 0) {
          edges.push({
            data: {
              id: `${matrix[i][j]}E`,
              source: `N${i}${j}`,
              target: `N${i}${j + 1}`
            }
          });
          edges.push({
            data: {
              id: `${matrix[i][j]}SE`,
              source: `N${i}${j}`,
              target: `N${i + 1}${j + 1}`
            }
          });
          edges.push({
            data: {
              id: `${matrix[i][j]}S`,
              source: `N${i}${j}`,
              target: `N${i + 1}${j}`
            }
          });
        }
        if (i === matrix.length - 1) {
          edges.push({
            data: {
              id: `${matrix[i][j]}N`,
              source: `N${i}${j}`,
              target: `N${i - 1}${j}`
            }
          });
          edges.push({
            data: {
              id: `${matrix[i][j]}NW`,
              source: `N${i}${j}`,
              target: `N${i - 1}${j - 1}`
            }
          });
          edges.push({
            data: {
              id: `${matrix[i][j]}W`,
              source: `N${i}${j}`,
              target: `N${i}${j - 1}`
            }
          });
        }
      } else {
        if (j === 0) {
          edges.push({
            data: {
              id: `${matrix[i][j]}E`,
              source: `N${i}${j}`,
              target: `N${i}${j + 1}`
            }
          });

          edges.push({
            data: {
              id: `${matrix[i][j]}N`,
              source: `N${i}${j}`,
              target: `N${i - 1}${j}`
            }
          });

          edges.push({
            data: {
              id: `${matrix[i][j]}NE`,
              source: `N${i}${j}`,
              target: `N${i - 1}${j + 1}`
            }
          });
        }

        if (j === matrix.length - 1) {
          edges.push({
            data: {
              id: `${matrix[i][j]}W`,
              source: `N${i}${j}`,
              target: `N${i}${j - 1}`
            }
          });
          edges.push({
            data: {
              id: `${matrix[i][j]}S`,
              source: `N${i}${j}`,
              target: `N${i + 1}${j}`
            }
          });

          edges.push({
            data: {
              id: `${matrix[i][j]}SW`,
              source: `N${i}${j}`,
              target: `N${i + 1}${j - 1}`
            }
          });
        }
      }

      if (i !== j && i + j === matrix.length - 1) {
        // Add logic for corner nodes , all have 3 adjacent nodes
        corners.push(matrix[i][j]);
        boundries.pop(matrix[i][j]);
      }
    }
    if (j - 1 === -1 || j + 1 === matrix.length) {
      boundries.push(matrix[i][j]);
      if (i === j) {
        boundries.pop(matrix[i][j]);
      }
      if (i !== j && i + j === matrix.length - 1) {
        boundries.pop(matrix[i][j]);
      }
    }
  }
}

for (let n in boundries) {
  let digits = ("" + boundries[n]).split("");
  let i, j;

  // if Matrix Address is more then 2 digit we need to split it accordingly here , i added upto 6 digit address
  if (digits.length === 6) {
    i = +`${digits[0]}${digits[1]}${digits[2]}`;
    j = +`${digits[3]}${digits[4]}${digits[5]}`;
  }
  if (digits.length === 5) {
    i = +`${digits[0]}${digits[1]}${digits[2]}`;
    j = +`${digits[3]}${digits[4]}`;
  }
  if (digits.length === 4) {
    i = +`${digits[0]}${digits[1]}`;
    j = +`${digits[2]}${digits[3]}`;
  }
  if (digits.length === 3) {
    i = +`${digits[0]}${digits[1]}`;
    j = +`${digits[2]}`;
  }
  if (digits.length === 2) {
    i = +`${digits[0]}`;
    j = +`${digits[1]}`;
  }
  if (i === 0) {
    edges.push({
      data: {
        id: `${matrix[i][j]}E`,
        source: `N${i}${j}`,
        target: `N${i}${j + 1}`
      }
    });
    edges.push({
      data: {
        id: `${matrix[i][j]}W`,
        source: `N${i}${j}`,
        target: `N${i}${j - 1}`
      }
    });
    edges.push({
      data: {
        id: `${matrix[i][j]}S`,
        source: `N${i}${j}`,
        target: `N${i + 1}${j}`
      }
    });
    edges.push({
      data: {
        id: `${matrix[i][j]}SE`,
        source: `N${i}${j}`,
        target: `N${i + 1}${j + 1}`
      }
    });
    edges.push({
      data: {
        id: `${matrix[i][j]}SW`,
        source: `N${i}${j}`,
        target: `N${i + 1}${j - 1}`
      }
    });
  }
  if (i === matrix.length - 1) {
    edges.push({
      data: {
        id: `${matrix[i][j]}E`,
        source: `N${i}${j}`,
        target: `N${i}${j + 1}`
      }
    });
    edges.push({
      data: {
        id: `${matrix[i][j]}W`,
        source: `N${i}${j}`,
        target: `N${i}${j - 1}`
      }
    });
    edges.push({
      data: {
        id: `${matrix[i][j]}N`,
        source: `N${i}${j}`,
        target: `N${i - 1}${j}`
      }
    });
    edges.push({
      data: {
        id: `${matrix[i][j]}NW`,
        source: `N${i}${j}`,
        target: `N${i - 1}${j - 1}`
      }
    });
    edges.push({
      data: {
        id: `${matrix[i][j]}NE`,
        source: `N${i}${j}`,
        target: `N${i - 1}${j + 1}`
      }
    });
  }

  if (j === 0) {
    edges.push({
      data: {
        id: `${matrix[i][j]}E`,
        source: `N${i}${j}`,
        target: `N${i}${j + 1}`
      }
    });
    edges.push({
      data: {
        id: `${matrix[i][j]}S`,
        source: `N${i}${j}`,
        target: `N${i + 1}${j}`
      }
    });
    edges.push({
      data: {
        id: `${matrix[i][j]}N`,
        source: `N${i}${j}`,
        target: `N${i - 1}${j}`
      }
    });
    edges.push({
      data: {
        id: `${matrix[i][j]}SE`,
        source: `N${i}${j}`,
        target: `N${i + 1}${j + 1}`
      }
    });
    edges.push({
      data: {
        id: `${matrix[i][j]}NE`,
        source: `N${i}${j}`,
        target: `N${i - 1}${j + 1}`
      }
    });
  }
  if (j === matrix.length - 1) {
    edges.push({
      data: {
        id: `${matrix[i][j]}W`,
        source: `N${i}${j}`,
        target: `N${i}${j - 1}`
      }
    });
    edges.push({
      data: {
        id: `${matrix[i][j]}S`,
        source: `N${i}${j}`,
        target: `N${i + 1}${j}`
      }
    });
    edges.push({
      data: {
        id: `${matrix[i][j]}N`,
        source: `N${i}${j}`,
        target: `N${i - 1}${j}`
      }
    });
    edges.push({
      data: {
        id: `${matrix[i][j]}NW`,
        source: `N${i}${j}`,
        target: `N${i - 1}${j - 1}`
      }
    });
    edges.push({
      data: {
        id: `${matrix[i][j]}SW`,
        source: `N${i}${j}`,
        target: `N${i + 1}${j - 1}`
      }
    });
  }
}

elements = {
  nodes,
  edges
};

fs.writeFileSync("mapdata.json", JSON.stringify(elements));

console.log("#################################################");
console.log("Matrix size", matrix.length);
console.log("edges", edges.length);
console.log("Nodes", nodes.length);
console.log("#################################################");
console.log("mapdata.json  is generated with above data");
