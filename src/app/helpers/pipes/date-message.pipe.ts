import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'dateMessagePipe',
  standalone: true,
})
export class DateMessagePipe implements PipeTransform {
  transform(value: Date | string): string {
    const today = new Date();
    const inputDate = new Date(value);

    if (
      today.getFullYear() === inputDate.getFullYear() &&
      today.getMonth() === inputDate.getMonth() &&
      today.getDate() === inputDate.getDate()
    ) {
      return 'Сегодня';
    } else {
      return formatDate(value, 'dd.MM.yyyy', 'en');
    }
  }
}
