import { createActionGroup, props } from '@ngrx/store';
import { Profile } from '@tt/interfaces/profile';

export const profileActions = createActionGroup({
  source: 'profile',
  events: {
    'filter events': props<{ filters: Record<string, any> }>(),
    'set page': props<{ page?: number }>(),
    'profile loaded': props<{ profiles: Profile[] }>(),
  },
});
