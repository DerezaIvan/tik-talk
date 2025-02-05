import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const canActivateAuth = () => {
  const isLoggetIn = inject(AuthService).isAuth;

  if (isLoggetIn) {
    return true;
  }

  return inject(Router).createUrlTree(['/login']);
};
