"use strict";
/**
 * Test scenario: Imports a single port call into an empty DB
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
            departure: moment('2019-03-01T00:00:00Z'),
            arrival: moment('2019-03-02T00:00:00Z'),
            port: {
                unLocode: 'FAKE1',
                name: 'Fake port 1',
            },
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
    }];
exports.expectedMergeActions = expectedMergeActions;
