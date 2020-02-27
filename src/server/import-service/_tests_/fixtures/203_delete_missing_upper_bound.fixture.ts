/** Test scenario
 * Update a single port call surrounded by 2 matching port calls.
 * The update is so that the updated port call overlaps with its stored version
 */
import {
  MergeAction, MergeActionType, ImportedVesselSchedule, StoredVesselSchedule,
} from '../../data-types';

import moment = require('moment');



const storedVesselSchedule: StoredVesselSchedule = {
  vessel: {
    imo: 1,
    name: 'Dummy vessel'
  },
  portCalls: [{
    id: '1',
    departure: moment('2019-02-25T01:00:00Z'),
    arrival: moment('2019-02-26T03:00:00Z'),
    port: {
      unLocode: 'FAKE1',
      name: 'Fake port 1',
    },
    isDeleted: false
  }, {
    id: '2',
    departure: moment('2019-03-01T01:00:00Z'),
    arrival: moment('2019-03-02T20:00:00Z'),
    port: {
      unLocode: 'FAKE2',
      name: 'Fake port 2',
    },
    isDeleted: false
  }, {
    id: '3',
    departure: moment('2019-03-05T09:00:00Z'),
    arrival: moment('2019-03-06T03:00:00Z'),
    port: {
      unLocode: 'FAKE3',
      name: 'Fake port 3',
    },
    isDeleted: false
  }]
};

const importedVesselSchedule: ImportedVesselSchedule = {
  cursorValueAtFetchTime: moment('2019-03-01'),
  vessel: storedVesselSchedule.vessel,
  portCalls: storedVesselSchedule.portCalls.filter(pc => pc.id !== '3'),
};

const expectedMergeActions: MergeAction[] = [{
  action: MergeActionType.DELETE,
  importedPortCall: null,
  storedPortCall: storedVesselSchedule.portCalls[2],
}];

export {
  importedVesselSchedule,
  storedVesselSchedule,
  expectedMergeActions,
};
