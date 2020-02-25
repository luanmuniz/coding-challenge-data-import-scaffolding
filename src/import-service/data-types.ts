import { Moment } from "moment"

export interface Vessel {
  name: string;
  imo: number;
}

export interface Port {
  name: string;
  unLocode: string;
}

export interface ImportedPortCall {
  port: Port;
  arrival: Moment;
  departure: Moment;
}

export interface ImportedVesselSchedule {
  cursorValueAtFetchTime: Moment;
  vessel: Vessel;
  portCalls: ImportedPortCall[]
}

export interface StoredPortCall {
  id: string; // Unique identifier for that port call. Usually an auto increment or a hash.
  port: Port;
  arrival: Moment;
  departure: Moment;
}

export interface StoredVesselSchedule {
  vessel: Vessel;
  portCalls: StoredPortCall[]
}

export enum MergeActionType {
  DELETE,
  UPDATE,
  INSERT
}

export interface MergeAction {
  action: MergeActionType;
  importedPortCall: ImportedPortCall | null;
  storedPortCall: StoredPortCall | null;
}