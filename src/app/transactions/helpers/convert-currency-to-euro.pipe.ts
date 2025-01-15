import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertCurrencyToEuroPipe',
  standalone: true
})
export class ConvertCurrencyToEuroPipe implements PipeTransform {
  transform(amount: number, currencyCode: string, currencyRate?: number): number {
    if (currencyCode !== 'EU' && currencyRate) {
      return amount * currencyRate;
    }
    return amount;
  }
}
