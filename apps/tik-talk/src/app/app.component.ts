import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AbstractControl, FormsModule, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, FormsModule],
})

// const validate: ValidatorFn = (control: AbstractControl) => {
//   return null;
//
// };
export class AppComponent {
  title = 'tik-talk';
}
