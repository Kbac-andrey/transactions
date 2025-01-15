import { Routes } from '@angular/router';

import { TransactionsListComponent } from './transactions/transactions-list/transactions-list.component';
import { TransactionDetailsComponent } from './transactions/transaction-details/transaction-details.component';
import {TransactionDetailsGuard} from './transactions/guard/transaction-details.guard';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'transactions', pathMatch: 'full' },
  {
    path: '',
    component: TransactionsListComponent
  },
  {
    path: 'transactions/:dayId/:transactionId',
    component: TransactionDetailsComponent,
    canActivate: [TransactionDetailsGuard],
  },
  { path: '**', redirectTo: 'transactions' }
];
