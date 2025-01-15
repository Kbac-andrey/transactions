import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

import { Observable } from 'rxjs';

import { TransactionsService } from '../services/transactions.service';
import { ITransaction } from '../../types/transactions';
import { ConvertCurrencyToEuroPipe } from '../helpers/convert-currency-to-euro.pipe';

@Component({
  selector: 'app-transaction-details',
  standalone: true,
  imports: [CommonModule, ConvertCurrencyToEuroPipe, AsyncPipe, DecimalPipe, MatDividerModule, RouterLink, MatButtonModule],
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss'],
})
export class TransactionDetailsComponent implements OnInit {
  public readonly DATE_TIME_FORMAT: string = 'dd/MM/yyyy HH:mm';

  public transactionDetails$!:  Observable<ITransaction>;
  public constructor(private _transactionsService: TransactionsService, private _activatedRoute: ActivatedRoute) {}

  public ngOnInit(): void {
    this.transactionDetails$ = this._transactionsService.transaction$;
  }
}
