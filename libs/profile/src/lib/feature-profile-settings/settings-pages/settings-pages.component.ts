import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  ViewChild,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { AvatarUploadComponent, ProfileHeaderComponent } from '../../ui';
import { ProfileService } from '../../data';
import { AddressInputComponent, StackInputComponent } from '@tt/common-ui';

@Component({
  selector: 'app-settings-pages',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    ReactiveFormsModule,
    AvatarUploadComponent,
    StackInputComponent,
    AddressInputComponent,
  ],
  templateUrl: './settings-pages.component.html',
  styleUrl: './settings-pages.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPagesComponent {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);
  route = inject(Router);

  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent;

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: [''],
    stack: [''],
    city: [null],
  });

  constructor() {
    effect(() => {
      //@ts-ignore
      this.form.patchValue({
        ...this.profileService.me(),
      });
    });
  }

  onSave() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    if (this.avatarUploader.avatar) {
      firstValueFrom(
        this.profileService.uploadAvatar(this.avatarUploader.avatar),
      );
    }

    firstValueFrom(
      //@ts-ignore
      this.profileService.patchProfile({
        ...this.form.value,
      }),
    );
  }
}
