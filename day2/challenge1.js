import { promises as fs } from 'fs';

const executeAdd = (program, instructionPointer) => {

}

const executeSubtract = (program, instructionPointer) => {

}

const executeDone = (program, instructionPointer) => {

}

const DONE_OPCODE = 99;
const instructionSet = {
    1: {
        name: 'add',
        size: 4,
        operands: {
            numA: {
                offset: 1
            },
            numB: {
                offset: 2
            },
            resultLocation: {
                offset: 3
            }
        },
        execute: (program, instructionPointer) => executeAdd(program, instructionPointer)
    },
    2: {
        name: 'subtract',
        size: 4,
        operands: {
            numA: {
                offset: 1
            },
            numB: {
                offset: 2
            }, 
            resultLocation: {
                offset: 3
            }
        },
        execute: (program, instructionPointer) => executeSubtract(program, instructionPointer)
    }
}

const readProgramFromInputFile = async (inputFilename) => {
    let fileContent = await fs.readFile(inputFilename, 'utf8');
    return fileContent
        .split(',')
        .map(val => parseInt(val));
}

function executeProgram(program) {
    console.log('Starting program');
    let instructionPointerIncrement;

    for(let instructionPointer = 0; instructionPointer < program.length; instructionPointer = instructionPointer + instructionPointerIncrement) {
        const opcode = program[instructionPointer];
        if (opcode === DONE_OPCODE) {
            console.log('Program complete');
            return;
        }

        const instruction = instructionSet[opcode];

        if (instruction === undefined) {
            throw `Invalid instruction: ${opcode}.`;
        } else {
            instruction.execute(program);
        }

        instructionPointerIncrement = instruction.size;
    }

    console.log('Program complete');
}

readProgramFromInputFile('input.txt')
    .then(program => {
        executeProgram(program);
        console.log(program);
    })
    .catch(err => console.log('Error reading input file: ' + err));
