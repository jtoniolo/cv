import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { experienceReducer } from './state/experience/experience.reducer';
import { contactReducer } from './state/contact/contact.reducer';
import { ExperienceEffects } from './state/experience/experience.effects';
import { ContactEffects } from './state/contact/contact.effects';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        provideStore({
          experience: experienceReducer,
          contact: contactReducer,
        }),
        provideEffects([ExperienceEffects, ContactEffects]),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'CV Application' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('CV Application');
  });
});
