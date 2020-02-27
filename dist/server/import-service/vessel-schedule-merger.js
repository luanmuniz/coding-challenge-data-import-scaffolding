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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fixtures_1 = require("./_tests_/fixtures");
const referenceImplementation = __importStar(require("./reference-implementation"));
const fixtures = fixtures_1.loadAllFixtures();
exports.mergeVesselSchedules = (importedVesselSchedule, storedVesselSchedule) => __awaiter(void 0, void 0, void 0, function* () {
    // *********************************************************************** //
    //                                                                         //
    // This is a DUMMY implementation that returns results from the test       //
    // fixtures.                                                               //
    //                                                                         //
    // The final implementation must absolutely not use the fixture data but   //
    // still pass the test and be able to work with the test API.              //
    //                                                                         //
    // *********************************************************************** //
    if (referenceImplementation.isConfigured) {
        // This is calling Portchain's reference implementation of the merging algorithm.
        // It is only for Portchain's internal use and not available to candidates.
        return yield referenceImplementation.mergeVesselSchedules(importedVesselSchedule, storedVesselSchedule);
    }
    else {
        const matchingFixture = fixtures.find(f => {
            const importedVesselScheduleMatch = JSON.stringify(importedVesselSchedule) === JSON.stringify(f.importedVesselSchedule);
            const storedVesselScheduleMatch = JSON.stringify(storedVesselSchedule) === JSON.stringify(f.storedVesselSchedule);
            return importedVesselScheduleMatch && storedVesselScheduleMatch;
        });
        if (matchingFixture) {
            return matchingFixture.expectedMergeActions;
        }
        else {
            return [];
        }
    }
});
