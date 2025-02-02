import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateConverterPipe',
  standalone: true,
})
export class DateConverterPipe implements PipeTransform {
  transform(value: string | null) {
    if (!value) return 'Не удалось опеределить дату';
    const date = new Date(value);
    date.setHours(date.getHours() + 3);
    const newDate = new Date();

    const diffMs = Math.round(newDate.getTime() - date.getTime());
    if (isNaN(diffMs) || diffMs < 0) {
      return 'Некорректная дата';
    }

    const seconds = Math.round(diffMs / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);
    const weeks = Math.round(days / 7);
    const months = Math.round(days / 30);
    const years = Math.round(days / 365);

    if (seconds < 60) {
      return `${seconds} ${getPluralForm(seconds, ['секунда', 'секунды', 'секунд'])} назад`;
    } else if (minutes < 60) {
      return `${minutes} ${getPluralForm(minutes, ['минута', 'минуты', 'минут'])} назад`;
    } else if (hours < 24) {
      return `${hours} ${getPluralForm(hours, ['час', 'часа', 'часов'])} назад`;
    } else if (days < 7) {
      return `${days} ${getPluralForm(days, ['день', 'дня', 'дней'])} назад`;
    } else if (weeks < 4) {
      return `${weeks} ${getPluralForm(weeks, ['неделя', 'недели', 'недель'])} назад`;
    } else if (months < 12) {
      return `${months} ${getPluralForm(months, ['месяц', 'месяца', 'месяцев'])} назад`;
    } else {
      return `${years} ${getPluralForm(years, ['год', 'года', 'лет'])} назад`;
    }
  }
}

function getPluralForm(value: number, forms: [string, string, string]): string {
  const absValue = Math.abs(value) % 100;
  const lastDigit = absValue % 10;

  if (absValue > 10 && absValue < 20) {
    return forms[2];
  }

  if (lastDigit === 1) {
    return forms[0];
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return forms[1];
  }

  return forms[2];
}
