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
const data_types_1 = require("../data-types");
const moment = require("moment");
const referenceActionToLocalActionEnum = (referenceAction) => {
    if (referenceAction === 'update') {
        return data_types_1.MergeActionType.UPDATE;
    }
    else if (referenceAction === 'insert') {
        return data_types_1.MergeActionType.INSERT;
    }
    else if (referenceAction === 'delete') {
        return data_types_1.MergeActionType.DELETE;
    }
    else {
        return null;
    }
};
exports.isConfigured = !!process.env.PORTCHAIN_MERGER_REFERENCE_IMPLEMENTATION_API_URL;
/**
 * This 'reference' implementation is calling an external API that merges vessel schedules (port calls) together.
 * It is used internally at Portchain to validate the implementation of the scaffolding. It also allows us to verify that the tests covering the merging algorithm are sound.
 */
exports.mergeVesselSchedules = (importedVesselSchedule, storedVesselSchedule) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = {};
    payload.existingPortCalls = storedVesselSchedule.portCalls.map(pc => {
        return {
            id: '' + pc.id,
            isDeleted: pc.isDeleted,
            arrival: pc.arrival,
            departure: pc.departure,
            port: {
                unLocode: pc.portId,
                name: pc.portName
            }
        };
    });
    payload.newPortCalls = importedVesselSchedule.portCalls.map(pc => {
        return {
            arrival: pc.arrival,
            departure: pc.departure,
            port: {
                unLocode: pc.portId,
                name: pc.portName
            }
        };
    });
    try {
        const response = yield node_fetch_1.default(process.env.PORTCHAIN_MERGER_REFERENCE_IMPLEMENTATION_API_URL, {
            method: 'post',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' }
        });
        let responseData = yield response.json();
        responseData = responseData.filter((actionData) => actionData.action !== 'match'); // The reference implementation returns the perfect match but the coding challenge does not require it
        // console.log(JSON.stringify(responseData, null, 2))
        const mergeActions = responseData.map((actionData) => {
            if (actionData.newPortCall) {
                actionData.newPortCall.arrival = moment(actionData.newPortCall.arrival);
                actionData.newPortCall.departure = moment(actionData.newPortCall.departure);
            }
            if (actionData.existingPortCall) {
                actionData.existingPortCall.arrival = moment(actionData.existingPortCall.arrival);
                actionData.existingPortCall.departure = moment(actionData.existingPortCall.departure);
            }
            return {
                action: referenceActionToLocalActionEnum(actionData.action),
                importedPortCall: actionData.newPortCall.map((pc) => {
                    return {
                        arrival: pc.arrival,
                        departure: pc.departure,
                        portId: pc.port.unLocode,
                        portName: pc.port.name
                    };
                }),
                storedPortCall: actionData.existingPortCall.map((pc) => {
                    return {
                        id: parseInt(pc.id, 10),
                        arrival: pc.arrival,
                        departure: pc.departure,
                        portId: pc.port.unLocode,
                        portName: pc.port.name
                    };
                })
            };
        });
        return mergeActions;
    }
    catch (e) {
        if (e.responseBody) {
            console.error((yield e.responseBody).toString());
        }
        throw e;
    }
    // const result = Buffer.from(response.base64, 'base64')
    return [];
});
