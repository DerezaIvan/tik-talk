import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ImgUrlPipe } from '@tt/common-ui';
import { Profile } from '@tt/interfaces/profile';

@Component({
  selector: 'app-subscriber-card',
  standalone: true,
  imports: [ImgUrlPipe],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriberCardComponent {
  @Input() profile!: Profile;
}
