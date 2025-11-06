import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class ContactComponent {
  // Minimal component for contact form
  // State management for form submission will be added in Phase 5
}
