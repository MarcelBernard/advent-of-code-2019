import { promises as fs } from 'fs';

const INSTRUCTION_SIZE = 4;
const instructionSet = {
    add: 1,
    subtract: 2,
    done: 99
}

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

function executeProgram(program) {
    console.log('Starting program');
    for(let instructionPointer = 0; instructionPointer < program.length; instructionPointer = instructionPointer + INSTRUCTION_SIZE) {
        const opcode = program[instructionPointer];
        console.log(`Executing instruction: ${opcode}`)

        switch(opcode) {
            case instructionSet.add:
                break;
            case instructionSet.subtract:
                break;
            case instructionSet.done:
                console.log('Program complete');
                return;
            default:
                throw `Invalid instruction: ${opcode}.`;
        }
    }

    console.log('Program complete');
}

function storeValue(location, value, program) {
    program[location] = value;
}

readProgramFromInputFile('input.txt')
    .then(program => {
        executeProgram(program);
        console.log(program);
    })
    .catch(err => console.log('Error reading input file: ' + err));
