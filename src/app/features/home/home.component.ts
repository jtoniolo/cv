import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { inject } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    RouterLink,
  ],
})
export class HomeComponent {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  constructor() {
    // Set page title and meta tags
    this.titleService.setTitle('Jeffrey Toniolo | Senior Systems Architect & Full Stack Developer');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Senior Systems Architect with 20+ years experience building enterprise applications. Expert in .NET, Angular, Azure, microservices, and legacy system modernization.',
    });
  }
}
