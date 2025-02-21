import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cv-container',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="cv-content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .cv-content {
      padding: 20px;
      height: 100%;
    }
  `]
})
export class CvContainerComponent {}
