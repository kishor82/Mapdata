let matrix = [];
let nodes = [];
let edges = [];
let corners = [];
let boundries = [];
let middle = [];
// size of matrix;
const size = 100;
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
  let i = +digits[0],
    j = +digits[1];
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

console.log("Matrix size", matrix.length);
// console.log(matrix);
// console.log(corners);
// console.log(boundries);
console.log(middle);
// console.log(edges);
console.log("edges", edges.length);
console.log("Nodes", nodes.length);
