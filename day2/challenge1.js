import { promises as fs } from 'fs';

const storeValue = (value, location, program) => {
    program[location] = value;
}

function executeAdd(program, instructionPointer) {
    const numAPointer = program[instructionPointer + this.offsets.numAPointer];
    const numBPointer = program[instructionPointer + this.offsets.numBPointer];

    const numA = program[numAPointer];
    const numB = program[numBPointer];
    const resultPointer = program[instructionPointer + this.offsets.resultPointer];

    const result = numA + numB;

    storeValue(result, resultPointer, program);
}

function executeMultiply(program, instructionPointer) {
    const numAPointer = program[instructionPointer + this.offsets.numAPointer];
    const numBPointer = program[instructionPointer + this.offsets.numBPointer];

    const numA = program[numAPointer];
    const numB = program[numBPointer];
    const resultPointer = program[instructionPointer + this.offsets.resultPointer];

    const result = numA * numB;

    storeValue(result, resultPointer, program);
}

const DONE_OPCODE = 99;
const instructionSet = {
    1: {
        name: 'add',
        size: 4,
        offsets: {
            numAPointer: 1,
            numBPointer: 2,
            resultPointer: 3
        },
        execute: executeAdd
    },
    2: {
        name: 'multiply',
        size: 4,
        offsets: {
            numAPointer: 1,
            numBPointer: 2,
            resultPointer: 3
        },
        execute: executeMultiply
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
            instruction.execute(program, instructionPointer);
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
    .catch(err => console.log('Error running program: ' + err));
