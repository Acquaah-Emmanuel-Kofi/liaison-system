import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { setUserDetails, setUserId, setUserRole } from './user.actions';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { IUser } from '../interfaces/user.interface';

const initialUserState: IUser = {
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    phoneNumber: 0,
    id: '',
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withDevtools('user'),
  withState(initialUserState),
  withMethods((store) => ({
    setUserDetails: (payload: IUser) => {
      patchState(store, setUserDetails(payload));
    },
    setUserRole: (payload: string) => {
      patchState(store, setUserRole(payload));
    },
    setUserId: (payload: string) => {
      patchState(store, setUserId(payload));
    },
  }))
);
