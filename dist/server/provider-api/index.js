"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const conf_1 = require("../conf");
const models_1 = require("../models");
const moment = require("moment");
const EXPECTED_CURSOR_FORMAT_IN_API = 'YYYY-MM-DD';
exports.fetchAvailableVessels = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield node_fetch_1.default(conf_1.PORTCHAIN_VESSEL_SCHEDULES_API_URL + '/vessels', {
            method: 'get',
            headers: { 'Accept': 'application/json' }
        });
        let vessels = yield response.json();
        return vessels.map(v => {
            return new models_1.Vessel(v);
        });
    }
    catch (e) {
        if (e.responseBody) {
            console.error((yield e.responseBody).toString());
        }
        throw e;
    }
});
const fetchVesselScheduleSnapshot = (vessel, cursor) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield node_fetch_1.default(`${conf_1.PORTCHAIN_VESSEL_SCHEDULES_API_URL}/vessel-schedules/${vessel.imo}?cursor=${cursor.format(EXPECTED_CURSOR_FORMAT_IN_API)}`, {
            method: 'get',
            headers: { 'Accept': 'application/json' }
        });
        let portCallsFromAPI = yield response.json();
        return portCallsFromAPI.map(portCallFromAPI => {
            return new models_1.PortCall({
                arrival: moment(portCallFromAPI.arrival),
                departure: moment(portCallFromAPI.departure),
                portId: portCallFromAPI.port.id,
                portName: portCallFromAPI.port.name,
                vessel
            });
        });
    }
    catch (e) {
        if (e.responseBody) {
            console.error((yield e.responseBody).toString());
        }
        throw e;
    }
});
const executeForAllPossibleCursorValues = (exec) => __awaiter(void 0, void 0, void 0, function* () {
    const cursorLowerBound = moment('2019-01-01').startOf('day');
    const cursorUpperBound = moment('2019-05-31').startOf('day');
    let cursor = moment(cursorLowerBound);
    while (cursor.isSameOrBefore(cursorUpperBound)) {
        yield exec(cursor);
        cursor = moment(cursor).add(1, 'day');
    }
});
exports.fetchFullVesselSchedule = (vessel, execFuncOnNewSchedule) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`Fetching all historical schedules for vessel ${vessel.name} (${vessel.imo})`);
    yield executeForAllPossibleCursorValues((cursor) => __awaiter(void 0, void 0, void 0, function* () {
        const vesselSchedule = yield fetchVesselScheduleSnapshot(vessel, cursor);
        console.info(`Received ${vesselSchedule.length} port calls for ${vessel.name} (${vessel.imo}) at cursor ${cursor.format(EXPECTED_CURSOR_FORMAT_IN_API)}`);
        yield execFuncOnNewSchedule(moment(cursor), vesselSchedule);
    }));
});
