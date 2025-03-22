import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'tt-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './tt-input.component.html',
  styleUrl: './tt-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TtInputComponent),
    },
  ],
})
export class TtInputComponent implements ControlValueAccessor {
  type = input<'text' | 'password'>('text');
  placeholder = input<string>();

  disabled = signal<boolean>(false);

  cdr = inject(ChangeDetectorRef);

  onChange: any;
  onTouched: any;

  value: string | null = null;

  writeValue(val: string | null) {
    this.value = val;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onModelChange(val: string | null): void {
    this.onChange(val);
    this.cdr.detectChanges();
  }
}
