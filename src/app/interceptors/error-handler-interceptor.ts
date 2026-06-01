import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
 
export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
 
      
      let mensajeUsuario = 'Ocurrio un error inesperado. Intenta de nuevo.';
 
      if (!navigator.onLine) {
        mensajeUsuario = 'Sin conexion a internet. Verifica tu red.';
      } else if (error.status === 0) {
        mensajeUsuario = 'No se pudo conectar al servidor. Intenta mas tarde.';
      } else if (error.status === 404) {
        mensajeUsuario = 'El recurso solicitado no fue encontrado.';
      } else if (error.status === 500) {
        mensajeUsuario = 'Error interno del servidor. Intenta mas tarde.';
      } else if (error.status === 401) {
        mensajeUsuario = 'No autorizado. Inicia sesion para continuar.';
      } else if (error.status === 403) {
        mensajeUsuario = 'No tienes permiso para acceder a este recurso.';
      } else if (error.status === 429) {
        mensajeUsuario = 'Demasiadas solicitudes. Espera un momento.';
      }
 
      
      console.error('[HTTP Error]', {
        status:  error.status,
        url:     req.url,
        method:  req.method,
        message: error.message
      });
 
      
      return throwError(() => ({
        mensajeUsuario,
        statusCode: error.status,
        originalError: error
      }));
    })
  );
};
