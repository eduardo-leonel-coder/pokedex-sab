import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SessionStore } from '@services/session-store';



export const authGuard: CanActivateFn = () => {
 const session = inject(SessionStore);
 const router = inject(Router)

 if (session.estaAutenticado()) {
  return true;
 }

 router.navigate(['/login']);
 return false;
};
