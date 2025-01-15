import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of } from 'rxjs';

import { TransactionsListComponent } from './transactions-list.component';
import { TransactionsService } from '../services/transactions.service';


describe('TransactionsListComponent', () => {
  let component: TransactionsListComponent;
  let fixture: ComponentFixture<TransactionsListComponent>;
  let transactionsServiceMock: jasmine.SpyObj<TransactionsService>;

  beforeEach(async () => {
    transactionsServiceMock = jasmine.createSpyObj('TransactionsService', ['getTransactions$', 'setTransaction']);

    transactionsServiceMock.getTransactions$.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [TransactionsListComponent, HttpClientTestingModule],
      providers: [{ provide: TransactionsService, useValue: transactionsServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionsListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
