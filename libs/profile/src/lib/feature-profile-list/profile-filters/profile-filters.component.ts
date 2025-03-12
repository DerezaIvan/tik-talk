import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { profileActions } from '../../data';

@Component({
  selector: 'app-profile-filters',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileFiltersComponent implements OnInit {
  fb = inject(FormBuilder);
  store = inject(Store);

  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  });

  constructor() {
    this.searchForm.valueChanges
      .pipe(startWith({}), debounceTime(300), takeUntilDestroyed())
      .subscribe((formValue) => {
        localStorage.setItem('filters', JSON.stringify(formValue));
        this.store.dispatch(
          profileActions.filterEvents({ filters: formValue }),
        );
      });
  }

  ngOnInit() {
    const saveValueInput = localStorage.getItem('filters');
    if (saveValueInput) {
      const filters = JSON.parse(saveValueInput);
      this.searchForm.patchValue(filters);
    }
  }
}
