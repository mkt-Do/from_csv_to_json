var fs = require('fs');

const filename = process.argv[2];

const pattern = /^[-]?([1-9]\d*|0)(\.\d+)?$/;
let header = [];
let jsonArr = [];
fs.readFile('./csv/' + filename + '.csv', 'utf8', (err, readData) => {
  if (err) return;
  const dataArr = readData.split('\n');
  let line = 0;
  for (let data of dataArr) {
    let obj = {};
    const arr = data.split(',');
    if(line++ === 0) {
      for (let a of arr) {
        header.push(a);
      }
    } else {
      if (arr.length !== header.length) continue;
      let index = 0;
      for (let a of arr) {
        if (pattern.test(a)) a = Number(a);
        obj[header[index++]] = a;
      }
      jsonArr.push(obj);
    }
  }
  fs.writeFile('./json/' + filename + '.json', JSON.stringify(jsonArr));
});
