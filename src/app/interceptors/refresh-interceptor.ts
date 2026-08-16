import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { SessionStore } from '@services/session-store';

export const refreshInterceptor: HttpInterceptorFn = (req, next) => {
  const session = inject(SessionStore);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if(error.status === 401){
        const nuevoToken = session.refrescarTokenMock();

        if (nuevoToken){
          const reqNueva = req.clone({
            setHeaders: {Authorization: `Bearer ${nuevoToken}`},
          })
          return next(reqNueva)
        }

        session.logout();
      }
      return throwError(()=> error)
    })
  )

};
