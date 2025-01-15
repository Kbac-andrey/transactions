import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TransactionsService } from '../services/transactions.service';
import { ITransaction } from '../../types/transactions';

@Injectable()
export class TransactionDetailsGuard {
  constructor(
    private _transactionsService: TransactionsService,
    private _router: Router
  ) {}

  public canActivate(snapshot: ActivatedRouteSnapshot): Observable<boolean> {
    const { dayId, transactionId } = snapshot.params;

    return this._transactionsService.transaction$.pipe(
      map((transaction: ITransaction) => {
        const isValid: boolean = dayId == transaction.date && transactionId == transaction.id;

        if (!isValid) {
          this._router.navigate(['/']);
        }

        return isValid;
      }),
    );
  }
}
