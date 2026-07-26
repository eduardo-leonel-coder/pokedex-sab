import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { errorHandlerInterceptor } from './interceptors/error-handler-interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    // RouterMOdule.forRoot(routes)
    provideRouter(routes),
    //HttpClientModule
    provideHttpClient(withFetch(), withInterceptors([errorHandlerInterceptor])),
    // provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
  ]
};

