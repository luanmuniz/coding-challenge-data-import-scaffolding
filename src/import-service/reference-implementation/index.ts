import fetch from 'node-fetch'
import { ImportedVesselSchedule, StoredVesselSchedule, MergeAction, MergeActionType } from '../data-types'
import moment = require('moment')


const referenceActionToLocalActionEnum = (referenceAction:string) => {
  if(referenceAction === 'update') {
    return MergeActionType.UPDATE
  } else if(referenceAction === 'insert') {
    return MergeActionType.INSERT
  } else if(referenceAction === 'delete') {
    return MergeActionType.DELETE
  } else {
    return null
  }
}

/**
 * This 'reference' implementation is calling an external API that merges vessel schedules (port calls) together.
 */
export const mergeVesselSchedules = async (importedVesselSchedule: ImportedVesselSchedule, storedVesselSchedule: StoredVesselSchedule): Promise<MergeAction[]> => {
  
  const payload:any = {}
  payload.existingPortCalls = storedVesselSchedule.portCalls
  payload.newPortCalls = importedVesselSchedule.portCalls

  try {
    const response:any = await fetch(process.env.PORTCHAIN_MERGER_REFERENCE_IMPLEMENTATION_API_URL, {
        method: 'post',
        body:    JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
    })
    let responseData = await response.json()
    responseData = responseData.filter((actionData:any) => actionData.action !== 'match') // The reference implementation returns the perfect match but the coding challenge does not require it
    const mergeActions:MergeAction[] = responseData.map((actionData:any) => {

      if(actionData.newPortCall) {
        actionData.newPortCall.arrival = moment(actionData.newPortCall.arrival)
        actionData.newPortCall.departure = moment(actionData.newPortCall.departure)
      }
      if(actionData.existingPortCall) {
        actionData.existingPortCall.arrival = moment(actionData.existingPortCall.arrival)
        actionData.existingPortCall.departure = moment(actionData.existingPortCall.departure)
      }

      return {
        action: referenceActionToLocalActionEnum(actionData.action),
        importedPortCall: actionData.newPortCall,
        storedPortCall: actionData.existingPortCall
      }
    })
    return mergeActions
  } catch (e) {
    if(e.responseBody) {
      console.error((await e.responseBody).toString())
    }
    throw e
  }
  
  // const result = Buffer.from(response.base64, 'base64')
  return []
}