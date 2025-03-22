import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { profileActions, selectFilteredProfiles } from '../../data';
import { ProfileCardComponent } from '../../ui';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import {
  WaIntersectionObservee,
  WaIntersectionObserverDirective,
} from '@ng-web-apis/intersection-observer';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    ProfileCardComponent,
    ProfileFiltersComponent,
    WaIntersectionObserverDirective,
    WaIntersectionObservee,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent {
  store = inject(Store);
  profiles = this.store.selectSignal(selectFilteredProfiles);

  timeToFetch() {
    this.store.dispatch(profileActions.setPage({}));
  }

  onIntersection(entries: IntersectionObserverEntry[]) {
    if (!entries.length) return;
    if (entries[0].intersectionRatio > 0) {
      this.timeToFetch();
    }
  }
}
