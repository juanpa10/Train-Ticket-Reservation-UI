import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';   // <-- aquí
import { routes } from './app/app.routes';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App,  {
  providers: [
    provideRouter(routes),
    provideHttpClient(),              // <-- agrega esto
  ],
}).catch(err => console.error(err));
  