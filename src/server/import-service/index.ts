import { fetchAvailableVessels, fetchFullVesselSchedule } from "../provider-api"
import { Vessel, PortCall } from "../models"
import { Moment }  from 'moment'
import { mergeVesselSchedules } from "./vessel-schedule-merger"



export const importVesselsIntoLocalDatabase = async () => {
  console.info('Importing vessels into the database...')
  const vesselsFromAPI = await fetchAvailableVessels()
  for(const vessel of vesselsFromAPI) {
    await Vessel.findOrCreate({
      where: {
        imo: vessel.imo, 
        name: vessel.name
      }
    })
  }
  console.info('All vessels were successfully imported into the database')
}

const importFullVesselSchedule = async (vessel:Vessel) => {
  console.info(`Reconstructing the full schedule history for vessel ${vessel.name} (${vessel.imo})`)
  PortCall.destroy({
    where: {vessel_imo: vessel.imo},
    truncate: true
  })
  await fetchFullVesselSchedule(vessel, async (cursor:Moment, importedVesselSchedule:PortCall[]) => {
    // This function will be called in-order for each value of cursor (from 2019-01-01 to 2019-05-31) with the vessel schedule at that cursor
    // TODO: 
    //   - Load this vessel's schedule from the DB
    //   - Merge the importedVesselSchedule with the current schedule from the DB (Cf. vessel-schedule-merger.ts)
    //   - Execute the actions
    const existingPortCalls = await PortCall.findAll({where: {vessel_imo: vessel.imo}})
    console.info(`Existing schedule fetched for vessel ${vessel.name} (${vessel.imo}): ${existingPortCalls.length}`)
    const mergeActions = mergeVesselSchedules({
        vessel: vessel,
        cursorValueAtFetchTime: cursor,
        portCalls: importedVesselSchedule
      },{
        vessel,
        portCalls: existingPortCalls
      })
    console.info(`New schedule received for vessel ${vessel.name} (${vessel.imo})`)
    console.info(JSON.stringify(mergeActions, null, 2))
    process.exit(0)
  })
  console.info(`Vessel ${vessel.name} (${vessel.imo}) has been fully imported into the local database`)
}

export const importAll = async () => {
  const vessels = await Vessel.findAll()
  await Promise.all(vessels.map(async vessel => { await importFullVesselSchedule(vessel) }))
}

export const importSingleVessel = async () => {
  const vessels = await Vessel.findAll()
  await importFullVesselSchedule(vessels[0])
}