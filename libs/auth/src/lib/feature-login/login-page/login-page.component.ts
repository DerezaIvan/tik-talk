import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@tt/auth';
import { SvgIconComponent, TtInputComponent } from '@tt/common-ui';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, TtInputComponent, SvgIconComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);

  isPasswordVisible = signal<boolean>(false);

  form = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  ngOnInit() {
    this.form.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  onSubmit() {
    if (this.form.valid) {
      // @ts-ignore
      this.authService.login(this.form.value).subscribe(() => {
        this.router.navigate(['']);
      });
    }
  }
}
