import { ConvertCurrencyToEuroPipe } from './convert-currency-to-euro.pipe';

describe('ConvertCurrencyToEuroPipe', () => {
  let pipe: ConvertCurrencyToEuroPipe;

  beforeEach(() => {
    pipe = new ConvertCurrencyToEuroPipe();
  });

  it('should convert USD to EUR if currencyRate is provided', () => {
    const result = pipe.transform(100, 'USD', 1.2);
    expect(result).toBe(120);
  });

  it('should return the same amount if currency is EUR', () => {
    const result = pipe.transform(50, 'EUR');
    expect(result).toBe(50);
  });

  it('should return the same amount if currencyRate is undefined', () => {
    const result = pipe.transform(50, 'USD');
    expect(result).toBe(50);
  });
});

