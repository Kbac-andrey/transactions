import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IDayTransaction, ITransaction, TransactionsResponse } from '../../types/transactions';
import { environment } from '../../environments/environment';

import { map, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private readonly _BASE_URL: string = environment.baseUrl;
  private _transaction$$: ReplaySubject<ITransaction> = new ReplaySubject(1);

  public constructor(private _http: HttpClient) {}

  public get transaction$(): Observable<ITransaction> {
    return this._transaction$$.asObservable();
  }

  public getTransactions$(): Observable<IDayTransaction[]> {
    return this._http.get<TransactionsResponse>(`${this._BASE_URL}/transactions`)
      .pipe(
        map((transactionsResponse: TransactionsResponse) => {
          return this._sortDates(transactionsResponse.days);
        })
      );
  }

  public setTransaction(transaction: ITransaction): void {
    this._transaction$$.next(transaction);
  }

  private _sortDates(transactionsDays: IDayTransaction[]): IDayTransaction[] {
      const Transaction: ITransaction[] = transactionsDays.flatMap((day:IDayTransaction) => day.transactions);

      const sortedTransactions: ITransaction[] = Transaction.sort((a: ITransaction, b: ITransaction) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      return  Object.entries(this._groupByDay(sortedTransactions)).map(([id, transactions]) => ({
        id,
        transactions,
      }));
    }

  private _groupByDay(sortedTransactions: ITransaction[]) {
   return sortedTransactions.reduce((acc: { [key: string]: ITransaction[] }, transaction: ITransaction) => {
      const timestamp:Date = new Date(transaction.timestamp);
      const dayId: string = timestamp.toISOString().split('T')[0];

      if (!acc[dayId]) {
        acc[dayId] = [];
      }
      acc[dayId].push(transaction);
      return acc;
    }, {});
  }
}
