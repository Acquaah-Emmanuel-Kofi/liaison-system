import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { setUserId, setUserRole } from './user.actions';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { IUser, Role } from '../interfaces/user.interface';

const initialUserState: IUser = {} as IUser;

export const UserStore = signalStore(
  { providedIn: 'root' },
  withDevtools('user'),
  withState(initialUserState),
  withMethods((store) => ({
    setUserRole: (payload: Role) => {
      patchState(store, setUserRole(payload));
    },
    setUserId: (payload: string) => {
      patchState(store, setUserId(payload));
    },
  }))
);
