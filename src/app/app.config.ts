import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {provideHttpClient, withFetch}              from '@angular/common/http';
import { provideAnimationsAsync }                  from '@angular/platform-browser/animations/async';
import {TransactionDetailsGuard} from './transactions/guard/transaction-details.guard';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(appRoutes), provideClientHydration(withEventReplay()), provideHttpClient(withFetch()), provideAnimationsAsync(),  { provide: TransactionDetailsGuard, useClass: TransactionDetailsGuard }]
};

