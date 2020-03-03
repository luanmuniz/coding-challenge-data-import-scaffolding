"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Test scenario
 * Update a single port call
 * The update make the updated overlaps with its stored version
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
            departure: moment('2019-03-01T02:00:00Z'),
            arrival: moment('2019-03-02T03:00:00Z'),
            portId: 'FAKE1',
            portName: 'Fake port 1',
            isDeleted: false
        }]
};
exports.storedVesselSchedule = storedVesselSchedule;
const importedVesselSchedule = {
    cursorValueAtFetchTime: moment('2019-03-01'),
    vessel: storedVesselSchedule.vessel,
    portCalls: [{
            departure: moment('2019-03-01T01:00:00Z'),
            arrival: moment('2019-03-02T02:00:00Z'),
            portId: 'FAKE1',
            portName: 'Fake port 1',
        }],
};
exports.importedVesselSchedule = importedVesselSchedule;
const expectedMergeActions = [{
        action: data_types_1.MergeActionType.UPDATE,
        importedPortCall: importedVesselSchedule.portCalls[0],
        storedPortCall: storedVesselSchedule.portCalls[0]
    }];
exports.expectedMergeActions = expectedMergeActions;
