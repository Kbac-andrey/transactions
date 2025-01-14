import { Routes } from '@angular/router';

import { TransactionsListComponent } from './transactions/transactions-list/transactions-list.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'transactions', pathMatch: 'full' },
  {
    path: '',
    component: TransactionsListComponent
  },
  // {
  //   path: ':dayId/:transactionId',
  //   component: TransactionDetailComponent
  // },
  { path: '**', redirectTo: 'transactions' }
];
