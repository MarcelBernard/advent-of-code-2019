import { promises as fs } from 'fs';
import * as os from 'os';

function getNextCoordinateStep(direction, movementMagnitude) {
    switch(direction) {
        case 'U':
            return {
                x: 0,
                y: movementMagnitude
            }
        case 'R':
            return {
                x: 0,
                y: movementMagnitude
            }
        case 'D':
            return {
                x: 0,
                y: movementMagnitude
            }
        case 'L':
            break;
    }

}

const readWirePaths = async (inputFilename) => {
    let fileContent = await fs.readFile(inputFilename, 'utf8');
    return fileContent
        .split('\n')
        .filter(line => line !== '');
}

readWirePaths('input.txt')
    .then(inputWires => {
        let result = inputWires.map((inputWire) => {
            return inputWire.split(',');
        })
        .map((wireSteps) => {
            let currentX = 0;
            let currentY = 0;
            return wireSteps.map((wireStep) => {
                let direction = wireStep[0];
                let movementMagnitude = parseInt(wireStep.slice(1));
            })
        })
    }). catch(err => console.log(err));