import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const canActivateAuth = () => {
  const isLoggetIn = inject(AuthService).isAuth;

  if (isLoggetIn) {
    return true;
  }

  return inject(Router).createUrlTree(['/login']);
};
