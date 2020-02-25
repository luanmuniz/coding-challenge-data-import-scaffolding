import { Moment } from "moment"
import { ImportedVesselSchedule, StoredVesselSchedule, MergeAction, MergeActionType } from "./data-types"
import moment = require("moment")


export const mergeVesselSchedules = async (importedVesselSchedule: ImportedVesselSchedule, storedVesselSchedule: StoredVesselSchedule): Promise<MergeAction[]> => {
  return [{
    action: MergeActionType.INSERT,
    importedPortCall: {
      departure: moment('2019-03-01T00:00:00Z'),
      arrival: moment('2019-03-02T00:00:00Z'),
      port: {
        unLocode: 'FAKE1',
        name: 'Fake port 1'
      }
    },
    storedPortCall: null
  }]
}