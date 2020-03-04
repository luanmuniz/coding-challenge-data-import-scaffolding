import { Moment } from 'moment';

export interface Vessel {
  name: string;
  imo: number;
}

export interface Port {
  name: string;
  unLocode: string;
}

export interface ImportedPortCall {
  portId: string;
  portName: string;
  arrival: Moment;
  departure: Moment;
}

export interface ImportedVesselSchedule {
  cursorValueAtFetchTime: Moment;
  vessel: Vessel;
  portCalls: ImportedPortCall[];
}

export interface StoredPortCall {
  id: number; // Unique identifier for that port call
  portId: string;
  portName: string;
  arrival: Moment;
  departure: Moment;
  isDeleted: boolean;
}

export interface StoredVesselSchedule {
  vessel: Vessel;
  portCalls: StoredPortCall[];
}

export enum MergeActionType {
  DELETE, // A stored port call should be deleted
  UPDATE, // A stored port call should be updated with new data from the import API
  INSERT // A port call from the import API should be inserted into the DB
}

/**
 * Describes a single action from the merge algorithm (this algorithm returns a list of actions)
 * 
 */
export interface MergeAction {
  action: MergeActionType; // The type of the merge action
  importedPortCall: ImportedPortCall | null; // The imported port call. This must be null if the action is DELETE.
  storedPortCall: StoredPortCall | null; // The port call as it is in the databse. This must be null if the action is INSERT.
}
