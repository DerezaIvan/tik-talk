import {
  DestroyRef,
  Directive,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { auditTime, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[ResizeHeight]',
  standalone: true,
})
export class ResizeHeightDirective implements OnInit {
  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);
  destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.onWindowResize();
  }

  @HostListener('window:resize')
  onWindowResize() {
    if ('window:resize') {
      fromEvent(window, 'resize')
        .pipe(auditTime(500), takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          const { top } =
            this.hostElement.nativeElement.getBoundingClientRect();
          const height = window.innerHeight - top - 24 - 24;
          this.r2.setStyle(
            this.hostElement.nativeElement,
            'height',
            `${height}px`
          );
        });
    }
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 48 - 48;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }
}
