import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TransactionsService } from './transactions.service';
import { environment } from '../../environments/environment';
import { ITransaction, TransactionsResponse } from '../../types/transactions';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let httpMock: HttpTestingController;

  const mockTransactionsResponse: TransactionsResponse = {
    days: [
      {
        id: '2025-01-14',
        transactions: [
          { id: 1, timestamp: '2025-01-14T14:00:00Z', amount: 100, currencyCode: 'USD', description: 'Transaction 1' },
          { id: 2, timestamp: '2025-01-14T13:00:00Z', amount: 200, currencyCode: 'USD', description: 'Transaction 2' }
        ]
      },
      {
        id: '2025-01-13',
        transactions: [
          { id: 3, timestamp: '2025-01-13T14:00:00Z', amount: 150, currencyCode: 'USD', description: 'Transaction 3' }
        ]
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransactionsService]
    });

    service = TestBed.inject(TransactionsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve and sort transactions by date', () => {
    service.getTransactions$().subscribe((transactions) => {
      expect(transactions.length).toBe(2);
      expect(transactions[0].id).toBe('2025-01-14')
      expect(transactions[1].id).toBe('2025-01-13');
      expect(transactions[0].transactions[0].timestamp).toBe('2025-01-14T14:00:00Z');
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/transactions`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTransactionsResponse);
  });

  it('should group transactions by day', () => {
    const transactions = service['_sortDates'](mockTransactionsResponse.days);

    expect(transactions.length).toBe(2);
    expect(transactions[0].id).toBe('2025-01-14');
    expect(transactions[1].id).toBe('2025-01-13');
    expect(transactions[0].transactions.length).toBe(2);
  });

  it('should update the transaction$ observable when setTransaction is called', () => {
    const mockTransaction: ITransaction = {
      id: 1,
      timestamp: '2025-01-14T10:00:00Z',
      amount: 300,
      currencyCode: 'USD',
      description: 'New Transaction'
    };

    service.setTransaction(mockTransaction);

    service.transaction$.subscribe((transaction) => {
      expect(transaction).toEqual(mockTransaction);
    });
  });
});
