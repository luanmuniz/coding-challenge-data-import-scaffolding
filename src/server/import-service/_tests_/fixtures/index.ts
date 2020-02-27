import * as fs from 'fs'
import * as path from 'path'
import { ImportedVesselSchedule } from '../..//data-types';
import { StoredVesselSchedule } from '../../data-types';
import { MergeAction } from '../../data-types';

const isAFixture = ((fileName: string) => /^.+\.fixture\.ts$/.test(fileName));

export interface Fixture {
  label: string;
  importedVesselSchedule: ImportedVesselSchedule;
  storedVesselSchedule: StoredVesselSchedule;
  expectedMergeActions: MergeAction[];
}

export const loadAllFixtures = () => {
  const fixtureFolder = path.join(__dirname);
  const fixtureFiles = fs.readdirSync(fixtureFolder, { encoding: 'utf8' });
  const fixtures: Fixture[] = fixtureFiles.map((fixtureFileName: string) => {
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
    } catch (err) {
      console.error(`Failed to read the appropriate fixture files from fixture at [${fixtureFolder}]`);
      console.error(err);
    }
    return null;
  }).filter(f => !!f)
  return fixtures
}