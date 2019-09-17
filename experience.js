let exp = 50;
let level = 1;
let expArr = [];
let levelArr = [];
for (let i = 1; i <= 100; i++) {
  exp = exp * 1.2;
  expArr.push(Math.trunc(exp));
  level = i;
  levelArr.push(level);
}

const levelExp = { level: levelArr, experience: expArr };

module.exports = levelExp;
