export interface IOtherParty {
  name: string;
  iban?: string;
}

export interface ITransaction {
  id: number;
  timestamp: string;
  amount: number;
  currencyCode: string;
  currencyRate?: number;
  description: string;
  otherParty?: IOtherParty;
}

export interface Day {
  id: string;
  transactions: ITransaction[];
}

export interface TransactionsResponse {
  days: Day[];
}
