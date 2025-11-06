import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ExperienceData } from '../models/experience.model';
import { EXPERIENCE_DATA } from '../generated/experience-data.generated';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  /**
   * Returns experience data from compiled module
   * @returns Observable of experience data
   */
  loadExperienceData(): Observable<ExperienceData> {
    return of(EXPERIENCE_DATA);
  }
}
