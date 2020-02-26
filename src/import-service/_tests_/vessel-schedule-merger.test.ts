
import { mergeVesselSchedules } from '../vessel-schedule-merger';
import { loadAllFixtures } from './fixtures';
import moment = require('moment');


const serializeMomentDates = (mergeAction:any) => {
  if(mergeAction && mergeAction.storedPortCall) {
    mergeAction.storedPortCall.arrival = JSON.stringify(moment(mergeAction.storedPortCall.arrival))
    mergeAction.storedPortCall.departure = JSON.stringify(moment(mergeAction.storedPortCall.departure))
  }
  if(mergeAction && mergeAction.importedPortCall) {
    mergeAction.importedPortCall.arrival = JSON.stringify(moment(mergeAction.importedPortCall.arrival))
    mergeAction.importedPortCall.departure = JSON.stringify(moment(mergeAction.importedPortCall.departure))
  }
}

/**
 * This dynamically creates test cases from the fixtures folder.
 */
describe('vessel-schedule-merger', () => {
  const fixtures = loadAllFixtures()
  fixtures.forEach((fixture) => {

    if(process.env.TEST_FIXTURE && !(new RegExp(process.env.TEST_FIXTURE)).test(fixture.label)) {
      return
    }

    it(fixture.label, async () => {
      const actualMergeActions = await mergeVesselSchedules(fixture.importedVesselSchedule, fixture.storedVesselSchedule);

      actualMergeActions.forEach(serializeMomentDates)
      fixture.expectedMergeActions.forEach(serializeMomentDates)

      expect(actualMergeActions).toMatchObject(fixture.expectedMergeActions);
    });
  });
});
