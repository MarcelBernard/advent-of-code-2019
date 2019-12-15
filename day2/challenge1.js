import { promises as fs } from 'fs';

// Advance over the input in steps of 4
// opcode 1 = add
// opcode 2 = multiply
// opcode 99 = halt

// Read in file in memory
// Split into array based on commas
// Pass to function to execute program
// Check opcode, opcode switch
// add, call add with next 2 and return value. Store value in position.
// multiple, call multiply next 2 and return value. Store value in position.
// 99: halt immediately, print array state.

const readProgramFromInputFile = async (inputFilename) => {
    let fileContent = await fs.readFile(inputFilename, 'utf8');
    return fileContent
        .split(',')
        .map(val => parseInt(val));
}

readProgramFromInputFile('input.txt')
    .then(program => console.log(program))
    .catch(err => console.log('Error reading input file: ' + err))
