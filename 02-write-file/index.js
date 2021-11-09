const fs = require('fs');
const path = require('path');
let writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));
const readline = require('readline');
const { stdin: input, stdout: output, stdout } = require('process');
const process = require('process');
const rl = readline.createInterface({input, output});
console.log('Привет! Введите текст:');
rl.on('line', (answer) => {
    if(answer === 'exit'){
        console.log('Запись завершена!')
        rl.close();
    }else{
        writeStream.write(`${answer}\n`);
    }
    
})

rl.on('SIGINT', () => {
    console.log('Запись завершена!')
        rl.close();
  });