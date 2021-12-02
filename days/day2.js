const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const cmds = input
  .trim()
  .split('\n')
  .map((v) => {
    const [dir, val] = v.trim().split(/\s/);

    return [dir, parseInt(val, 10)];
  });

const pos = { x: 0, y: 0, aim: 0 };

for (const cmd of cmds) {
  const [dir, value] = cmd;
  switch (dir) {
    case 'forward':
      pos.x += value;
      pos.y += pos.aim * value;
      break;
    case 'down':
      pos.aim += value;
      break;
    case 'up':
      pos.aim -= value;
      break;
  }
}

console.log(pos.x * pos.y);
