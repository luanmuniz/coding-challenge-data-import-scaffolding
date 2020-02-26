
import { mergeVesselSchedules } from '../vessel-schedule-merger';
import { loadAllFixtures } from './fixtures';
import moment = require('moment');


const serializeMomentDates = (mergeAction:any) => {
  if(mergeAction && mergeAction.storedPortCall) {
    mergeAction.storedPortCall.arrival = moment(mergeAction.storedPortCall.arrival).toISOString()
    mergeAction.storedPortCall.departure = moment(mergeAction.storedPortCall.departure).toISOString()
  }
  if(mergeAction && mergeAction.importedPortCall) {
    mergeAction.importedPortCall.arrival = moment(mergeAction.importedPortCall.arrival).toISOString()
    mergeAction.importedPortCall.departure = moment(mergeAction.importedPortCall.departure).toISOString()
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
