/** Test scenario
 * Update a single port call
 * The update make the updated overlaps with its stored version
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
    id: 1,
    arrival: moment('2019-03-01T02:00:00Z'),
    departure: moment('2019-03-02T03:00:00Z'),
    portId: 'FAKE1',
    portName: 'Fake port 1',
    isDeleted: false
  }]
};

const importedVesselSchedule: ImportedVesselSchedule = {
  cursorValueAtFetchTime: moment('2019-03-01'),
  vessel: storedVesselSchedule.vessel,
  portCalls: [{
    arrival: moment('2019-03-01T01:00:00Z'),
    departure: moment('2019-03-02T02:00:00Z'),
    portId: 'FAKE1',
    portName: 'Fake port 1',
  }],
};

const expectedMergeActions: MergeAction[] = [{
  action: MergeActionType.UPDATE,
  importedPortCall: importedVesselSchedule.portCalls[0],
  storedPortCall: storedVesselSchedule.portCalls[0]
}];

export {
  importedVesselSchedule,
  storedVesselSchedule,
  expectedMergeActions,
};
