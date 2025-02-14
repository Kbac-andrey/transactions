import {Component, OnInit, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { Subject, takeUntil } from 'rxjs';

import { IDayTransaction, ITransaction } from '../../types/transactions';
import { ConvertCurrencyToEuroPipe } from '../helpers/convert-currency-to-euro.pipe';
import { TransactionsService } from '../services/transactions.service';

@Component({
  selector: 'app-transactions-list',
  standalone: true,
  imports: [
    CommonModule,
    ConvertCurrencyToEuroPipe,
    MatTableModule,
    MatPaginatorModule,
    RouterLink
  ],
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
})
export class TransactionsListComponent implements AfterViewInit, OnInit, OnDestroy {
  public readonly DISPLAY_COLUMNS: string[] = ['date', 'otherParty', 'amount'];
  public readonly DATE_FORMAT: string = 'dd/MM/yyyy';
  public readonly PAGE_SIZE: number = 10;
  public readonly PAGE_SIZE_OPTIONS: number[] = [10, 20, 30];

  public transactions!: ITransaction[];
  public dataSource:MatTableDataSource<ITransaction> = new MatTableDataSource<ITransaction>([]);

  private _destroy$$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public constructor(private _transactionsService: TransactionsService) {
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  public ngOnInit(): void {
    this._transactionsService.getTransactions$()
      .pipe(takeUntil(this._destroy$$))
      .subscribe((sortedDaysTransactions: IDayTransaction[]) => {
      this.transactions = sortedDaysTransactions.flatMap(day =>
        day.transactions.map((transaction: ITransaction) => ({
          ...transaction,
          date: day.id,
        }))
      );
    });
    this.dataSource.data = this.transactions;
  }

  public getDetails(details: ITransaction): void {
    this._transactionsService.setTransaction(details);
  }

  ngOnDestroy(): void {
    this._destroy$$.next();
    this._destroy$$.complete();
  }
}
