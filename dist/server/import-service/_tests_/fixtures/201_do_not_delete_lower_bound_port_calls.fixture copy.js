"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Test scenario
 * Update a single port call surrounded by 2 matching port calls.
 * The update is so that the updated port call overlaps with its stored version
 */
const data_types_1 = require("../../data-types");
const moment = require("moment");
const storedVesselSchedule = {
    vessel: {
        imo: 1,
        name: 'Dummy vessel'
    },
    portCalls: [{
            id: 1,
            departure: moment('2019-02-25T01:00:00Z'),
            arrival: moment('2019-02-26T03:00:00Z'),
            portId: 'FAKE1',
            portName: 'Fake port 1',
            isDeleted: false
        }, {
            id: 2,
            departure: moment('2019-03-01T01:00:00Z'),
            arrival: moment('2019-03-02T20:00:00Z'),
            portId: 'FAKE2',
            portName: 'Fake port 2',
            isDeleted: false
        }, {
            id: 3,
            departure: moment('2019-03-05T09:00:00Z'),
            arrival: moment('2019-03-06T03:00:00Z'),
            portId: 'FAKE3',
            portName: 'Fake port 3',
            isDeleted: false
        }]
};
exports.storedVesselSchedule = storedVesselSchedule;
const importedVesselSchedule = {
    cursorValueAtFetchTime: moment('2019-03-01'),
    vessel: storedVesselSchedule.vessel,
    portCalls: [{
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
const expectedMergeActions = [{
        action: data_types_1.MergeActionType.UPDATE,
        importedPortCall: importedVesselSchedule.portCalls[0],
        storedPortCall: storedVesselSchedule.portCalls[1],
    }, {
        action: data_types_1.MergeActionType.UPDATE,
        importedPortCall: importedVesselSchedule.portCalls[1],
        storedPortCall: storedVesselSchedule.portCalls[2],
    }];
exports.expectedMergeActions = expectedMergeActions;
