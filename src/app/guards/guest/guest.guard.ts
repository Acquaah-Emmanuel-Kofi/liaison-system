import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../pages/auth/services/auth/auth.service';
import { inject } from '@angular/core';
import { UserStore } from '../../shared/store/user.store';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const userStore = inject(UserStore);

  if (authService.isAuthenticated()) {
    router.navigate([userStore.role().toLowerCase()]);
    return false;
  }

  return true;
};
