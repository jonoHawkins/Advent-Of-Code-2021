const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const depths = input
  .trim()
  .split('\n')
  .map((v) => parseInt(v, 10));

const groups = group(depths, 3);
const sums = groups.map((v) => sum(...v));

console.log(groups);
console.log(sums);
console.log(countIncreases(sums));

function countIncreases(arr) {
  return arr.reduce((c, v, i, a) => {
    const last = a[i - 1];

    if (last && v > last) {
      return c + 1;
    }

    return c;
  }, 0);
}

function sum(...v) {
  return v.reduce((c, v) => c + v, 0);
}

function group(arr, windowSize) {
  let out = [];
  for (let i = 0; i < arr.length; i++) {
    let group = [];

    for (let j = 0; j < windowSize; j++) {
      const v = arr[i + j];
      if (v === undefined) {
        return out;
      }

      group.push(v);
    }
    out.push(group);
  }
  return out;
}
