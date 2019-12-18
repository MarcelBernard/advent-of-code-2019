import { promises as fs } from 'fs';
import * as os from 'os';

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

        console.log(result);
    }). catch(err => console.log(err));