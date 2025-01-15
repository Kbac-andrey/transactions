import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';

import { of } from 'rxjs';

import { TransactionDetailsGuard } from './transaction-details.guard';
import { TransactionsService } from '../services/transactions.service';
import { ITransaction } from '../../types/transactions';

describe('TransactionDetailsGuard', () => {
  let guard: TransactionDetailsGuard;
  let mockRouter: Router;
  let mockTransactionsService: jasmine.SpyObj<TransactionsService>;
  let mockTransaction: ITransaction;

  beforeEach(() => {
    mockTransaction = {
      id: 123,
      date: '2025-01-15',
      timestamp: '2025-01-15T12:00:00Z',
      amount: 100,
      currencyCode: 'USD',
      description: 'Test transaction',
    };

    mockTransactionsService = jasmine.createSpyObj('TransactionsService', [], {
      transaction$: of(mockTransaction), // Mock the getter directly
    });

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        TransactionDetailsGuard,
        { provide: TransactionsService, useValue: mockTransactionsService },
      ]
    });

    guard = TestBed.inject(TransactionDetailsGuard);
    mockRouter = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if transaction matches route params', () => {
    const snapshot: ActivatedRouteSnapshot = {
      params: { dayId: '2025-01-15', transactionId: '123' },
    } as any;

    spyOn(mockRouter, 'navigate');

    guard.canActivate(snapshot).subscribe((result) => {
      expect(result).toBeTrue();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });
  });

  it('should prevent activation and navigate to home if transaction does not match route params', () => {
    const snapshot: ActivatedRouteSnapshot = {
      params: { dayId: '2025-01-15', transactionId: '999' },
    } as any;

    spyOn(mockRouter, 'navigate');

    guard.canActivate(snapshot).subscribe((result) => {
      expect(result).toBeFalse();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });
  });

  it('should prevent activation and navigate to home if dayId does not match', () => {
    const snapshot: ActivatedRouteSnapshot = {
      params: { dayId: '2025-01-14', transactionId: '123' },
    } as any;

    spyOn(mockRouter, 'navigate');

    guard.canActivate(snapshot).subscribe((result) => {
      expect(result).toBeFalse();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });
  });

  it('should prevent activation and navigate to home if transactionId does not match', () => {
    const snapshot: ActivatedRouteSnapshot = {
      params: { dayId: '2025-01-15', transactionId: '999' },
    } as any;

    spyOn(mockRouter, 'navigate');

    guard.canActivate(snapshot).subscribe((result) => {
      expect(result).toBeFalse();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });
  });
});
