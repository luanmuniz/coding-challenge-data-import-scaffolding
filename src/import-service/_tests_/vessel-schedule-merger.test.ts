
import * as fs from 'fs';
import * as path from 'path';
import { mergeVesselSchedules } from '../vessel-schedule-merger';
import { ImportedVesselSchedule, StoredVesselSchedule, MergeAction } from '../data-types';

interface TestCase {
  testCaseLabel: string;
  importedVesselSchedule: ImportedVesselSchedule;
  storedVesselSchedule: StoredVesselSchedule;
  expectedMergeActions: MergeAction[];
}

const PATH_FIXTURES = 'fixtures';

const isAFixture = ((fileName: string) => /^.+\.fixture\.ts$/.test(fileName));


/**
 * This dynamically creates test cases from the fixtures folder.
 */
describe('vessel-schedule-merger', () => {
  const fixtureFolder = path.join(__dirname, PATH_FIXTURES);
  const fixtures = fs.readdirSync(fixtureFolder, { encoding: 'utf8' });
  const testCases: TestCase[] = fixtures.map((fixtureName: string) => {
    if (!isAFixture(fixtureName)) {
      return null;
    }
    try {
      const fixtureData = require(path.join(fixtureFolder, fixtureName));
      return {
        testCaseLabel: fixtureName,
        importedVesselSchedule: fixtureData.importedVesselSchedule,
        storedVesselSchedule: fixtureData.storedVesselSchedule,
        expectedMergeActions: fixtureData.expectedMergeActions,
      };
    } catch (err) {
      console.error(`Failed to read the appropriate fixture files from fixture at [${fixtureFolder}]`);
      console.error(err);
    }
    return null;
  }).filter((f) => !!f);

  testCases.forEach((tc) => {
    if (tc) {
      it(tc.testCaseLabel, async () => {
        const actualMergeActions = await mergeVesselSchedules(tc.importedVesselSchedule, tc.storedVesselSchedule);
        expect(actualMergeActions).toMatchObject(tc.expectedMergeActions);
      });
    }
  });
});
