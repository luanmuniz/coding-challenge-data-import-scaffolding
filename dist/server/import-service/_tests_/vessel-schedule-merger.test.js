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
Object.defineProperty(exports, "__esModule", { value: true });
const vessel_schedule_merger_1 = require("../vessel-schedule-merger");
const fixtures_1 = require("./fixtures");
const moment = require("moment");
const serializeMomentDates = (mergeAction) => {
    if (mergeAction && mergeAction.storedPortCall) {
        mergeAction.storedPortCall.arrival = moment(mergeAction.storedPortCall.arrival).toISOString();
        mergeAction.storedPortCall.departure = moment(mergeAction.storedPortCall.departure).toISOString();
    }
    if (mergeAction && mergeAction.importedPortCall) {
        mergeAction.importedPortCall.arrival = moment(mergeAction.importedPortCall.arrival).toISOString();
        mergeAction.importedPortCall.departure = moment(mergeAction.importedPortCall.departure).toISOString();
    }
};
/**
 * This dynamically creates test cases from the fixtures folder.
 */
describe('vessel-schedule-merger', () => {
    const fixtures = fixtures_1.loadAllFixtures();
    fixtures.forEach((fixture) => {
        if (process.env.TEST_FIXTURE && !(new RegExp(process.env.TEST_FIXTURE)).test(fixture.label)) {
            return;
        }
        it(fixture.label, () => __awaiter(void 0, void 0, void 0, function* () {
            const actualMergeActions = yield vessel_schedule_merger_1.mergeVesselSchedules(fixture.importedVesselSchedule, fixture.storedVesselSchedule);
            actualMergeActions.forEach(serializeMomentDates);
            fixture.expectedMergeActions.forEach(serializeMomentDates);
            expect(actualMergeActions).toMatchObject(fixture.expectedMergeActions);
        }));
    });
});
