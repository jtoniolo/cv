import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-cv-container',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatSidenavModule, MatToolbarModule],
  template: `
    <mat-sidenav-container>
      <mat-toolbar color="primary">
        <span>CV</span>
      </mat-toolbar>

      <main>
        <router-outlet></router-outlet>
      </main>
    </mat-sidenav-container>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }

    mat-sidenav-container {
      height: 100%;
    }

    main {
      padding: 20px;
    }
  `]
})
export class CvContainerComponent {}
