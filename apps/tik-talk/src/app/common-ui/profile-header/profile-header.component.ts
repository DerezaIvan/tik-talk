import { Component, input } from '@angular/core';
import { Profile } from '../../../../../../libs/profile/src/lib/data/interfaces/profile.interfaces';
import { AvatarCircleComponent } from '../../../../../../libs/common-ui/src/lib/components/avatar-circle/avatar-circle.component';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [AvatarCircleComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
})
export class ProfileHeaderComponent {
  profile = input<Profile>();
}
