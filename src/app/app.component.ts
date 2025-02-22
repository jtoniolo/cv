import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { Store } from '@ngrx/store';
import { CvPageActions } from './state/cv/cv.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'CV Application';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(CvPageActions.loadCV());
  }
}
