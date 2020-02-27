"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const isAFixture = ((fileName) => /^.+\.fixture\.ts$/.test(fileName));
exports.loadAllFixtures = () => {
    const fixtureFolder = path.join(__dirname);
    const fixtureFiles = fs.readdirSync(fixtureFolder, { encoding: 'utf8' });
    const fixtures = fixtureFiles.map((fixtureFileName) => {
        if (!isAFixture(fixtureFileName)) {
            return null;
        }
        try {
            const fixtureData = require(path.join(fixtureFolder, fixtureFileName));
            return {
                label: fixtureFileName,
                importedVesselSchedule: fixtureData.importedVesselSchedule,
                storedVesselSchedule: fixtureData.storedVesselSchedule,
                expectedMergeActions: fixtureData.expectedMergeActions,
            };
        }
        catch (err) {
            console.error(`Failed to read the appropriate fixture files from fixture at [${fixtureFolder}]`);
            console.error(err);
        }
        return null;
    }).filter(f => !!f);
    return fixtures;
};
