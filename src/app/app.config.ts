import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay, withNoHttpTransferCache } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';

import { errorHandlerInterceptor } from '@interceptors/error-handler-interceptor';
import { authInterceptor } from '@interceptors/auth-interceptor';
import { refreshInterceptor } from '@interceptors/refresh-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    // RouterMOdule.forRoot(routes)
    provideRouter(routes),
    //HttpClientModule
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor, errorHandlerInterceptor, refreshInterceptor])),
      provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
  ]
};