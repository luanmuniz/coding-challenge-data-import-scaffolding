/**
 * Test scenario: Imports a single port call into an empty DB
 */


import {
  MergeAction, MergeActionType, ImportedVesselSchedule, StoredVesselSchedule,
} from '../../data-types';

import moment = require('moment');

const importedVesselSchedule: ImportedVesselSchedule = {
  cursorValueAtFetchTime: moment('2019-03-01'),
  vessel: {
    imo: 1,
    name: 'Dummy vessel'
  },
  portCalls: [{
    departure: moment('2019-03-01T00:00:00Z'),
    arrival: moment('2019-03-02T00:00:00Z'),
    portId: 'FAKE1',
    portName: 'Fake port 1',
  }],
};

const storedVesselSchedule: StoredVesselSchedule = {
  vessel: importedVesselSchedule.vessel,
  portCalls: [],
};

const expectedMergeActions: MergeAction[] = [{
  action: MergeActionType.INSERT,
  importedPortCall: importedVesselSchedule.portCalls[0],
  storedPortCall: null,
}];

export {
  importedVesselSchedule,
  storedVesselSchedule,
  expectedMergeActions,
};
