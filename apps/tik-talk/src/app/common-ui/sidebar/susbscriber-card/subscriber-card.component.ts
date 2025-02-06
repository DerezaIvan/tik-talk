import { Component, Input } from '@angular/core';
import { Profile } from '../../../../../../../libs/profile/src/lib/data/interfaces/profile.interfaces';
import { ImgUrlPipe } from '../../../../../../../libs/common-ui/src/lib/pipes/img-url.pipe';

@Component({
  selector: 'app-subscriber-card',
  standalone: true,
  imports: [ImgUrlPipe],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss',
})
export class SubscriberCardComponent {
  @Input() profile!: Profile;
}
