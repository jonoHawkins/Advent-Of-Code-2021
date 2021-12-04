const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

class BingoCell {
    value;
    isMarked = false;

    constructor(value) {
        this.value = value;
    }
}

class BingoBoard {
    cellsLayout = [];
    cellsByValue = {};

    toString() {
        return this.cellsLayout
            .map((r) =>
                r
                    .map((c) => {
                        let value = c.value.toString();

                        if (value.length === 1) {
                            value = " " + value;
                        }

                        return c.isMarked ? `[${value}]` : ` ${value} `;
                    })
                    .join(" ")
            )
            .join("\n");
    }

    constructor(boardValues) {
        for (let row of boardValues) {
            const _r = [];
            this.cellsLayout.push(_r);

            for (let v of row) {
                if (this.cellsByValue[v]) {
                    throw new Error(`cell ${v} already exists in board`);
                }

                const cell = new BingoCell(v);
                this.cellsByValue[v] = cell;
                _r.push(cell);
            }
        }
    }

    markNumber(number) {
        if (this.cellsByValue[number]) {
            this.cellsByValue[number].isMarked = true;
        }

        return this;
    }

    isComplete() {
        // could do this with two loops but meh
        return this.#isRowComplete() || this.#isColumnComplete();
    }

    #isRowComplete() {
        for (let i = 0; i < this.cellsLayout.length; i++) {
            const row = this.cellsLayout[i];

            for (let j = 0; j < row.length; j++) {
                const cell = row[j];

                if (!cell.isMarked) {
                    break;
                }

                if (j === row.length - 1) {
                    return true;
                }
            }
        }

        return false;
    }

    #isColumnComplete() {
        for (let column = 0; column < this.cellsLayout[0].length; column++) {
            for (let row = 0; row < this.cellsLayout.length; row++) {
                const cell = this.cellsLayout[row][column];

                if (!cell.isMarked) {
                    break;
                }

                if (row === this.cellsLayout.length - 1) {
                    return true;
                }
            }
        }

        return false;
    }

    getScore() {
        return Object.values(this.cellsByValue)
            .filter((b) => !b.isMarked)
            .reduce((c, b) => c + b.value, 0);
    }
}

function parseInput(input) {
    const [calls, ...boards] = input.split("\n\n");

    return {
        calls: calls.split(",").map((v) => parseInt(v, 10)),
        boards: boards.map(
            (board) =>
                new BingoBoard(
                    board.split("\n").map((row) =>
                        row
                            .trim()
                            .split(/\s+/)
                            .map((v) => parseInt(v, 10))
                    )
                )
        ),
    };
}

const { calls, boards } = parseInput(input);
const { num, board } = findLastWinner(calls, boards);

console.log({
    num,
    score: board.getScore(),
    total: num * board.getScore(),
});

function findFirstWinner(calls, boards) {
    for (const num of calls) {
        for (const board of boards) {
            if (board.markNumber(num).isComplete()) {
                return { num, board };
            }
        }
    }
}

function findLastWinner(calls, boards) {
    while (calls.length) {
        const num = calls.shift();

        // console.log(num);
        // console.log('-------------------------')

        for (const board of boards) {
            board.markNumber(num);
            // console.log(board.toString());
            // console.log('-------------------------')
        }

        if (boards.length === 1 && boards[0].isComplete()) {
            return { num, board: boards[0] };
        }

        boards = boards.filter((b) => !b.isComplete());
    }
}
