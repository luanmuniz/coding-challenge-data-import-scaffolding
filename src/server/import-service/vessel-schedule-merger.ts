import {
  ImportedVesselSchedule, StoredVesselSchedule, MergeAction,
} from './data-types';

import { loadAllFixtures } from './_tests_/fixtures';
import * as referenceImplementation from './reference-implementation'


const fixtures = loadAllFixtures()
/**
 * Outputs a list of actions based on 2 inputs: (1) a new vessel schedule and (2) an existing vessel schedule.
 * The possible actions are described in the enum 'MergeActionType'. These are:
 *   - INSERT: inserts a new port call in the database
 *   - UPDATE: updates an existing port call in the database
 *   - DELETE: removes a port call from the database
 */
export const mergeVesselSchedules = async (importedVesselSchedule: ImportedVesselSchedule, storedVesselSchedule: StoredVesselSchedule): Promise<MergeAction[]> => {
  // TODO: reimplement this function to merge vessel schedules
  if(referenceImplementation.isConfigured) {
    // This is calling Portchain's reference implementation of the merging algorithm.
    // It is only for Portchain's internal use and not available to candidates.
    return await referenceImplementation.mergeVesselSchedules(importedVesselSchedule, storedVesselSchedule)
  } else {
    // *********************************************************************** //
    //                                                                         //
    // This is a DUMMY implementation that returns results from the test       //
    // fixtures.                                                               //
    //                                                                         //
    // The final implementation must absolutely not use the fixture data but   //
    // still pass the tests and be able to work with the import API.           //
    //                                                                         //
    // *********************************************************************** //
    const matchingFixture = fixtures.find(f => {
      const importedVesselScheduleMatch = JSON.stringify(importedVesselSchedule) === JSON.stringify(f.importedVesselSchedule)
      const storedVesselScheduleMatch = JSON.stringify(storedVesselSchedule) === JSON.stringify(f.storedVesselSchedule)
      return importedVesselScheduleMatch && storedVesselScheduleMatch
    })
    if(matchingFixture) {
      return matchingFixture.expectedMergeActions
    } else {
      return []
    }
  }
};
