/**
 * Test scenario: Imports 3 port calls into an empty DB
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
    departure: moment('2019-02-25T01:18:00Z'),
    arrival: moment('2019-02-26T02:54:00Z'),
    port: {
      unLocode: 'FAKE1',
      name: 'Fake port 1',
    },
  }, {
    departure: moment('2019-03-01T01:00:00Z'),
    arrival: moment('2019-03-02T20:00:00Z'),
    port: {
      unLocode: 'FAKE2',
      name: 'Fake port 2',
    },
  }, {
    departure: moment('2019-03-05T09:00:00Z'),
    arrival: moment('2019-03-06T03:00:00Z'),
    port: {
      unLocode: 'FAKE3',
      name: 'Fake port 3',
    },
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
}, {
  action: MergeActionType.INSERT,
  importedPortCall: importedVesselSchedule.portCalls[1],
  storedPortCall: null,
}, {
  action: MergeActionType.INSERT,
  importedPortCall: importedVesselSchedule.portCalls[2],
  storedPortCall: null,
}];

export {
  importedVesselSchedule,
  storedVesselSchedule,
  expectedMergeActions,
};
