import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserStore } from '../../shared/store/user.store';

export const roleGuard: CanActivateFn = (route, state) => {
  const userStore = inject(UserStore);
  const router = inject(Router);

  if (!state.url.includes(`${userStore.role().toLowerCase()}`)) {
    
    router.navigateByUrl(
      userStore.role() ? `/${userStore.role().toLowerCase()}` : '/'
    );

    return false;
  }

  return true;
};
