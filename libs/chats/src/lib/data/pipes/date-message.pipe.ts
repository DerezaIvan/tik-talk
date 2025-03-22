import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'dateMessagePipe',
  standalone: true,
})
export class DateMessagePipe implements PipeTransform {
  transform(value: Date | string): string {
    const today = DateTime.now().startOf('day');
    const inputDate = DateTime.fromJSDate(new Date(value)).startOf('day');

    return inputDate.equals(today)
      ? 'Сегодня'
      : inputDate.toFormat('dd.MM.yyyy');
  }
}
