

import * as importer from '../server/import-service/'
import { Vessel } from '../server/models'


let vesselImo:number = null
if(process.env.VESSEL_IMO) {
  vesselImo = parseInt(process.env.VESSEL_IMO, 10)
}


const runImport = async () => {
  if(vesselImo) {
    const vessel = await Vessel.findOne({where: {imo: vesselImo}})
    await importer.importSingleVesselSchedules(vessel)
  } else {
    await importer.importAllVesselsSchedules()
  }
}

runImport()
  .then(() => {
    console.info('Import command finishes successfully')
    process.exit(0)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })