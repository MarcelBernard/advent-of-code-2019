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
    let instructionPointerIncrement;

    for(let instructionPointer = 0; instructionPointer < program.length; instructionPointer = instructionPointer + instructionPointerIncrement) {
        const opcode = program[instructionPointer];
        if (opcode === DONE_OPCODE) {
            return program[0];
        }

        const instruction = instructionSet[opcode];

        if (instruction === undefined) {
            throw `Invalid instruction: ${opcode}.`;
        } else {
            instruction.execute(program, instructionPointer);
        }

        instructionPointerIncrement = instruction.size;
    }

    return program[0];
}

readProgramFromInputFile('input.txt')
    .then(program => {
        for(let noun = 0; noun <= 99; noun++) {
            for(let verb = 0; verb <=99; verb++) {
                let programCopy = [...program];
                programCopy[1] = noun;
                programCopy[2] = verb;
                
                let result = executeProgram(programCopy);
                
                if (result === 19690720) {
                    console.log(`Input noun: ${noun}`);
                    console.log(`Input verb: ${verb}`);
                    return;
                }
            }
        }
    })
    .catch(err => console.log('Error running program: ' + err));
