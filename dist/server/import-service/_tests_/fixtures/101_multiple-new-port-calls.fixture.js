"use strict";
/**
 * Test scenario: Imports 3 port calls into an empty DB
 */
Object.defineProperty(exports, "__esModule", { value: true });
const data_types_1 = require("../../data-types");
const moment = require("moment");
const importedVesselSchedule = {
    cursorValueAtFetchTime: moment('2019-03-01'),
    vessel: {
        imo: 1,
        name: 'Dummy vessel'
    },
    portCalls: [{
            departure: moment('2019-02-25T01:18:00Z'),
            arrival: moment('2019-02-26T02:54:00Z'),
            portId: 'FAKE1',
            portName: 'Fake port 1',
        }, {
            departure: moment('2019-03-01T01:00:00Z'),
            arrival: moment('2019-03-02T20:00:00Z'),
            portId: 'FAKE2',
            portName: 'Fake port 2',
        }, {
            departure: moment('2019-03-05T09:00:00Z'),
            arrival: moment('2019-03-06T03:00:00Z'),
            portId: 'FAKE3',
            portName: 'Fake port 3',
        }],
};
exports.importedVesselSchedule = importedVesselSchedule;
const storedVesselSchedule = {
    vessel: importedVesselSchedule.vessel,
    portCalls: [],
};
exports.storedVesselSchedule = storedVesselSchedule;
const expectedMergeActions = [{
        action: data_types_1.MergeActionType.INSERT,
        importedPortCall: importedVesselSchedule.portCalls[0],
        storedPortCall: null,
    }, {
        action: data_types_1.MergeActionType.INSERT,
        importedPortCall: importedVesselSchedule.portCalls[1],
        storedPortCall: null,
    }, {
        action: data_types_1.MergeActionType.INSERT,
        importedPortCall: importedVesselSchedule.portCalls[2],
        storedPortCall: null,
    }];
exports.expectedMergeActions = expectedMergeActions;
