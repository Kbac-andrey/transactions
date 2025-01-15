export interface IOtherParty {
  name: string;
  iban?: string;
}

export interface ITransaction {
  id: number;
  date?: string;
  timestamp: string;
  amount: number;
  currencyCode: string;
  currencyRate?: number;
  description: string;
  otherParty?: IOtherParty;
}

export interface IDayTransaction {
  id: string;
  transactions: ITransaction[];
}

export interface TransactionsResponse {
  days: IDayTransaction[];
}
