const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

const bits = parseInput(input);
const commonBits = parseInt(rankBitsAll(bits).join(""), 2);
const uncommonBits =
    commonBits ^
    parseInt(Array.from({ length: bits[0].length }).fill(1).join(""), 2);

const oxRating = parseInt(
    rankAndReduce(bits, (counts) => {
        return counts[0] > counts[1] ? 0 : 1;
    }).join(""),
    2
);
const c02Rating = parseInt(
    rankAndReduce(bits, (counts) => {
        return counts[0] > counts[1] ? 1 : 0;
    }).join(""),
    2
);

console.log(oxRating * c02Rating);

function rankAndReduce(bits, pickSelector) {
    bits = [...bits];
    let index = 0;

    while ((column = getColumn(bits, index))) {
        const counts = getCounts(column);
        const selector = pickSelector(counts);

        bits = bits.filter((v) => {
            return v[index] === selector;
        });

        if (bits.length === 1) {
            return bits[0];
        }

        index++;
    }
}

function getCounts(arr) {
    const counts = [];

    for (v of arr) {
        counts[v] = (counts[v] || 0) + 1;
    }

    return counts;
}

function getColumn(arr, index = 0) {
    if (arr[0][index] === undefined) {
        return;
    }

    return arr.map((row) => row[index]);
}

function rankBitsAll(arr) {
    const counts = [];

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (!counts[j]) {
                counts[j] = [];
            }

            const value = arr[i][j];

            if (counts[j][value]) {
                counts[j][value] += 1;
            } else {
                counts[j][value] = 1;
            }
        }
    }

    return counts.map((count) => {
        return count[0] > count[1] ? 0 : 1;
    });
}

function parseInput(input) {
    return input
        .trim()
        .split("\n")
        .map((v) => v.split("").map((v) => parseInt(v, 10)));
}
