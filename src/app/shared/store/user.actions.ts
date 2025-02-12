import { PartialStateUpdater } from '@ngrx/signals';
import { produce } from 'immer';
import { IUser } from '../interfaces/user.interface';

export function setUserDetails(
  payloadUserState: IUser
): PartialStateUpdater<IUser> {
  return (baseState) =>
    produce(baseState, (draft) => {
      draft.firstName = payloadUserState.firstName;
      draft.otherName = payloadUserState.otherName;
      draft.lastName = payloadUserState.lastName;
      draft.email = payloadUserState.email;
      draft.phone = payloadUserState.phone;
      draft.role = payloadUserState.role;
      draft.id = payloadUserState.id;
    });
}

export function setUserRole(role: string): PartialStateUpdater<IUser> {
  return (baseState) =>
    produce(baseState, (draft) => {
      draft.role = role;
    });
}

export function setUserId(id: string): PartialStateUpdater<IUser> {
  return (baseState) =>
    produce(baseState, (draft) => {
      draft.id = id;
    });
}
