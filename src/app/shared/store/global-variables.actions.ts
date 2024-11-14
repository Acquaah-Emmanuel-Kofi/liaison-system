import { PartialStateUpdater } from "@ngrx/signals";
import { produce } from "immer";
import { IGlobalVariables } from "../interfaces/global-variables.interface";

export function setInternshipType(
  type: boolean
): PartialStateUpdater<IGlobalVariables> {
  return (baseState) =>
    produce(baseState, (draft) => {
      draft.type = type;
    });
}

export function setStartOfAcademicYear(
  date: number
): PartialStateUpdater<IGlobalVariables> {
  return (baseState) =>
    produce(baseState, (draft) => {
      draft.startYear = date;
    });
}

export function setEndOfAcademicYear(
  date: number
): PartialStateUpdater<IGlobalVariables> {
  return (baseState) =>
    produce(baseState, (draft) => {
      draft.endYear = date;
    });
}
