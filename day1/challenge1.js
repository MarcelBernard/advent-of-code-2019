import { readFile} from 'fs';

function calculateModuleFuelRequirement(moduleMass) {
    return Math.floor(moduleMass / 3) - 2;
}

function calculateTotalFuelRequirement(moduleMasses) {
    return moduleMasses.reduce((totalFuel, moduleMass) => {
        return totalFuel + calculateModuleFuelRequirement(moduleMass);
    }, 0);
}

readFile('challenge1-input.txt', 'utf8', (err, contents) => {
    let moduleMasses = contents.toString().split("\n").filter(line => line != '');
    console.log(calculateTotalFuelRequirement(moduleMasses));
});

let tests = [
    {
        inputModuleMass: 0,
        expectedFuelMass: -2
    },
    {
        inputModuleMass: -1000,
        expectedFuelMass: -336
    },
    {
        inputModuleMass: 3,
        expectedFuelMass: -1
    },
    {
        inputModuleMass: 19,
        expectedFuelMass: 4
    },
    {
        inputModuleMass: 12,
        expectedFuelMass: 2
    },
    {
        inputModuleMass: 14,
        expectedFuelMass: 2
    },
    {
        inputModuleMass: 19,
        expectedFuelMass: 4
    },
    {
        inputModuleMass: 1969,
        expectedFuelMass: 654
    },
    {
        inputModuleMass: 100756,
        expectedFuelMass: 33583
    },
]

tests.forEach(({inputModuleMass, expectedFuelMass}) => {
    if (expectedFuelMass !== calculateModuleFuelRequirement(inputModuleMass)) {
        console.log('FAIL');
    } else {
        console.log('PASS');
    }
});

let totalFuelMassExpected = 34588;
let caclulatedFuelMasses = tests.map((test) => {
    return calculateModuleFuelRequirement(test.inputModuleMass);
})

if (totalFuelMassExpected === calculateModuleFuelRequirement(caclulatedFuelMasses)) {
    console.log('FAIL');
} else {
    console.log('PASS');
}