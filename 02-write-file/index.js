const fs = require('fs');
const path = require('path');
const readline = require('readline');
const output = fs.createWriteStream(path.join(__dirname, 'userInput.txt'), 'utf-8');

console.log('Hello user, please enter your text below:');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('close', () => console.log('Goodbye! All your text were saved in the userInput.txt file'));

rl.on('line', (input) => {
  if (input === 'exit') {
    rl.close();
    output.end();
  } else {
    output.write(input + '\n');
  }
});
