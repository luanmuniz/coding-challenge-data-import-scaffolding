"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Test scenario
 * Complex scenario with multiple inserts, edits and deletes
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
            departure: moment('2019-02-01T00:00:00Z'),
            arrival: moment('2019-02-02T00:00:00Z'),
            portId: 'FAKE1',
            portName: 'Fake port 1',
            isDeleted: false
        }, {
            id: 2,
            departure: moment('2019-02-10T00:00:00Z'),
            arrival: moment('2019-02-11T00:00:00Z'),
            portId: 'FAKE2',
            portName: 'Fake port 2',
            isDeleted: false // delete
        }, {
            id: 3,
            departure: moment('2019-02-12T00:00:00Z'),
            arrival: moment('2019-02-13T00:00:00Z'),
            portId: 'FAKE3',
            portName: 'Fake port 3',
            isDeleted: false
        }, {
            id: 4,
            departure: moment('2019-02-25T00:00:00Z'),
            arrival: moment('2019-02-28T00:00:00Z'),
            portId: 'FAKE1',
            portName: 'Fake port 1',
            isDeleted: false
        }, {
            id: 5,
            departure: moment('2019-03-05T00:00:00Z'),
            arrival: moment('2019-03-06T00:00:00Z'),
            portId: 'FAKE2',
            portName: 'Fake port 2',
            isDeleted: false
        }, {
            id: 6,
            departure: moment('2019-04-01T00:00:00Z'),
            arrival: moment('2019-04-01T00:00:00Z'),
            portId: 'FAKE3',
            portName: 'Fake port 3',
            isDeleted: false
        }, {
            id: 7,
            departure: moment('2019-04-10T00:00:00Z'),
            arrival: moment('2019-04-11T00:00:00Z'),
            portId: 'FAKE1',
            portName: 'Fake port 1',
            isDeleted: false
        }, {
            id: 8,
            departure: moment('2019-04-12T00:00:00Z'),
            arrival: moment('2019-04-13T00:00:00Z'),
            portId: 'FAKE2',
            portName: 'Fake port 2',
            isDeleted: false
        }]
};
exports.storedVesselSchedule = storedVesselSchedule;
const importedVesselSchedule = {
    cursorValueAtFetchTime: moment('2019-02-05'),
    vessel: storedVesselSchedule.vessel,
    portCalls: [{
            //id: '3',
            departure: moment('2019-02-09T21:00:00Z'),
            arrival: moment('2019-02-10T15:00:00Z'),
            portId: 'FAKE3',
            portName: 'Fake port 3',
        }, {
            //id: '4',
            departure: moment('2019-02-24T07:00:00Z'),
            arrival: moment('2019-02-25T23:30:00Z'),
            portId: 'FAKE1',
            portName: 'Fake port 1',
        }, {
            //id: '5',
            departure: moment('2019-03-05T00:00:00Z'),
            arrival: moment('2019-03-06T00:00:00Z'),
            portId: 'FAKE2',
            portName: 'Fake port 2',
        }, {
            //id: '7',
            departure: moment('2019-04-12T22:30:00Z'),
            arrival: moment('2019-04-13T13:45:00Z'),
            portId: 'FAKE1',
            portName: 'Fake port 1'
        }],
};
exports.importedVesselSchedule = importedVesselSchedule;
const expectedMergeActions = [{
        action: data_types_1.MergeActionType.DELETE,
        storedPortCall: storedVesselSchedule.portCalls[1],
        importedPortCall: null
    }, {
        action: data_types_1.MergeActionType.UPDATE,
        storedPortCall: storedVesselSchedule.portCalls[2],
        importedPortCall: importedVesselSchedule.portCalls[0]
    }, {
        action: data_types_1.MergeActionType.UPDATE,
        storedPortCall: storedVesselSchedule.portCalls[3],
        importedPortCall: importedVesselSchedule.portCalls[1]
    }, {
        action: data_types_1.MergeActionType.DELETE,
        storedPortCall: storedVesselSchedule.portCalls[5],
        importedPortCall: null
    }, {
        action: data_types_1.MergeActionType.UPDATE,
        storedPortCall: storedVesselSchedule.portCalls[6],
        importedPortCall: importedVesselSchedule.portCalls[3]
    }, {
        action: data_types_1.MergeActionType.DELETE,
        storedPortCall: storedVesselSchedule.portCalls[7],
        importedPortCall: null
    }
];
exports.expectedMergeActions = expectedMergeActions;
