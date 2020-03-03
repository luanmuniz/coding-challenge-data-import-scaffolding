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
const provider_api_1 = require("../provider-api");
const models_1 = require("../models");
const vessel_schedule_merger_1 = require("./vessel-schedule-merger");
exports.importVesselsIntoLocalDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    console.info('Importing vessels into the database...');
    const vesselsFromAPI = yield provider_api_1.fetchAvailableVessels();
    for (const vessel of vesselsFromAPI) {
        yield models_1.Vessel.findOrCreate({
            where: {
                imo: vessel.imo,
                name: vessel.name
            }
        });
    }
    console.info('All vessels were successfully imported into the database');
});
const importFullVesselSchedule = (vessel) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`Reconstructing the full schedule history for vessel ${vessel.name} (${vessel.imo})`);
    models_1.PortCall.destroy({
        where: { vessel_imo: vessel.imo },
        truncate: true
    });
    yield provider_api_1.fetchFullVesselSchedule(vessel, (cursor, importedVesselSchedule) => __awaiter(void 0, void 0, void 0, function* () {
        // This function will be called in-order for each value of cursor (from 2019-01-01 to 2019-05-31) with the vessel schedule at that cursor
        // TODO: 
        //   - Load this vessel's schedule from the DB
        //   - Merge the importedVesselSchedule with the current schedule from the DB (Cf. vessel-schedule-merger.ts)
        //   - Execute the actions
        const existingPortCalls = yield models_1.PortCall.findAll({ where: { vessel_imo: vessel.imo } });
        console.info(`Existing schedule fetched for vessel ${vessel.name} (${vessel.imo}): ${existingPortCalls.length}`);
        const mergeActions = vessel_schedule_merger_1.mergeVesselSchedules({
            vessel: vessel,
            cursorValueAtFetchTime: cursor,
            portCalls: importedVesselSchedule
        }, {
            vessel,
            portCalls: existingPortCalls
        });
        console.info(`New schedule received for vessel ${vessel.name} (${vessel.imo})`);
        console.info(JSON.stringify(mergeActions, null, 2));
        process.exit(0);
    }));
    console.info(`Vessel ${vessel.name} (${vessel.imo}) has been fully imported into the local database`);
});
exports.importAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const vessels = yield models_1.Vessel.findAll();
    yield Promise.all(vessels.map((vessel) => __awaiter(void 0, void 0, void 0, function* () { yield importFullVesselSchedule(vessel); })));
});
exports.importSingleVessel = () => __awaiter(void 0, void 0, void 0, function* () {
    const vessels = yield models_1.Vessel.findAll();
    yield importFullVesselSchedule(vessels[0]);
});
