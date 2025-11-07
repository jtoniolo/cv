import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import {
  ContactPageActions,
  selectIsSubmitting,
  selectIsSubmitted,
  selectContactError,
  selectSuccessMessage,
} from '../../state';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
})
export class ContactComponent implements OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly destroy$ = new Subject<void>();

  contactForm: FormGroup;
  isSubmitting$ = this.store.select(selectIsSubmitting);
  isSubmitted$ = this.store.select(selectIsSubmitted);
  error$ = this.store.select(selectContactError);
  successMessage$ = this.store.select(selectSuccessMessage);

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      company: [''],
      phone: [''],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      preferredContact: ['email'],
      interests: [[]],
    });

    // Reset form when submission is successful
    this.isSubmitted$.pipe(takeUntil(this.destroy$)).subscribe((submitted) => {
      if (submitted) {
        this.contactForm.reset({
          preferredContact: 'email',
          interests: [],
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.store.dispatch(
        ContactPageActions.submitForm({
          formData: this.contactForm.value,
        })
      );
    } else {
      Object.keys(this.contactForm.controls).forEach((key) => {
        const control = this.contactForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  resetForm(): void {
    this.contactForm.reset({
      preferredContact: 'email',
      interests: [],
    });
    this.store.dispatch(ContactPageActions.resetForm());
  }
}
