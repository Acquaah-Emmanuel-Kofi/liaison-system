import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import {
  setEndOfAcademicYear,
  setInternshipType,
  setSemester,
  setStartOfAcademicYear,
} from './global-variables.actions';
import { IGlobalVariables } from '../interfaces/global-variables.interface';

const currentYear = new Date().getFullYear();
const nextYear = currentYear + 1;

const initialInternshipTypeState: IGlobalVariables = {
  type: true,
  startYear: currentYear,
  endYear: nextYear,
  semester: 1,
};

export const GlobalVariablesStore = signalStore(
  { providedIn: 'root' },
  withDevtools('global'),
  withState(initialInternshipTypeState),
  withMethods((store) => ({
    setInternshipType: (payload: boolean) => {
      patchState(store, setInternshipType(payload));
    },
    setStartOfAcademicYear: (payload: number) => {
      patchState(store, setStartOfAcademicYear(payload));
    },
    setEndOfAcademicYear: (payload: number) => {
      patchState(store, setEndOfAcademicYear(payload));
    },
    setSemester: (payload: number) => {
      patchState(store, setSemester(payload));
    },
  }))
);
