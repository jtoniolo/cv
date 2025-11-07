import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { contactReducer } from '../../state/contact/contact.reducer';
import { ContactEffects } from '../../state/contact/contact.effects';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent, ReactiveFormsModule, NoopAnimationsModule],
      providers: [
        provideStore({ contact: contactReducer }),
        provideEffects([ContactEffects]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize contact form with required fields', () => {
    expect(component.contactForm.get('name')).toBeTruthy();
    expect(component.contactForm.get('email')).toBeTruthy();
    expect(component.contactForm.get('subject')).toBeTruthy();
    expect(component.contactForm.get('message')).toBeTruthy();
  });

  it('should mark form as invalid when required fields are empty', () => {
    expect(component.contactForm.valid).toBeFalsy();
  });

  it('should mark form as valid when all required fields are filled', () => {
    component.contactForm.patchValue({
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'Test message content',
    });
    expect(component.contactForm.valid).toBeTruthy();
  });

  it('should validate email format', () => {
    const emailControl = component.contactForm.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.hasError('email')).toBeTruthy();

    emailControl?.setValue('valid@email.com');
    expect(emailControl?.hasError('email')).toBeFalsy();
  });

  it('should set page title', () => {
    expect(document.title).toContain('Contact');
  });
});
