
import * as fs from 'fs';
import * as path from 'path';
import { mergeVesselSchedules } from '../vessel-schedule-merger';
import { ImportedVesselSchedule, StoredVesselSchedule, MergeAction } from '../data-types';
import { loadAllFixtures } from './fixtures';




/**
 * This dynamically creates test cases from the fixtures folder.
 */
describe('vessel-schedule-merger', () => {
  const fixtures = loadAllFixtures()
  fixtures.forEach((fixture) => {
    it(fixture.label, async () => {
      const actualMergeActions = await mergeVesselSchedules(fixture.importedVesselSchedule, fixture.storedVesselSchedule);
      expect(actualMergeActions).toMatchObject(fixture.expectedMergeActions);
    });
  });
});
