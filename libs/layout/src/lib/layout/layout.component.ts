import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResizeHeightDirective } from '@tt/common-ui';
import { SidebarComponent } from '../sidebar';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  imports: [SidebarComponent, RouterOutlet, ResizeHeightDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
