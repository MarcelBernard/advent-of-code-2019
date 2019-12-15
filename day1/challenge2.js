import * as fs from 'fs';

function calculateModuleFuelRequirementRecursive(moduleMass) {
    let addedFuelMass = Math.floor(moduleMass / 3) - 2;

    if (addedFuelMass < 0) {
        return 0;
    }

    return calculateModuleFuelRequirementRecursive(addedFuelMass) + addedFuelMass;
}

function calculateTotalFuelRequirement(moduleMasses) {
    return moduleMasses.reduce((totalFuel, moduleMass) => {
        return totalFuel + calculateModuleFuelRequirementRecursive(moduleMass);
    }, 0);
}

fs.readFile('challenge1-input.txt', 'utf8', (err, contents) => {
    let moduleMasses = contents.toString().split("\n").filter(line => line != '');
    console.log(calculateTotalFuelRequirement(moduleMasses));
});

let tests = [
    {
        inputModuleMass: 14,
        expectedFuelMass: 2
    },
    {
        inputModuleMass: 1969,
        expectedFuelMass: 966
    },
    {
        inputModuleMass: 100756,
        expectedFuelMass: 50346
    },
]

tests.forEach(({inputModuleMass, expectedFuelMass}) => {
    let calculatedFuelMass = calculateModuleFuelRequirementRecursive(inputModuleMass);
    if (expectedFuelMass !== calculatedFuelMass) {
        console.log(`Expected ${expectedFuelMass} got ${calculatedFuelMass}: FAIL`);
    } else {
        console.log('PASS');
    }
});

let totalFuelMassExpected = 51314;
let caclulatedFuelMasses = tests.map((test) => {
    return calculateModuleFuelRequirementRecursive(test.inputModuleMass);
})

let calculatedTotalFuelMass = calculateTotalFuelRequirement(caclulatedFuelMasses)
if (totalFuelMassExpected === calculatedTotalFuelMass) {
    console.log(`Expected ${totalFuelMassExpected} got ${calculatedTotalFuelMass}: FAIL`);
} else {
    console.log('PASS');
}