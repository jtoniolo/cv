import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CvData } from '../models/cv.model';
import { CV_DATA } from '../generated/cv-data.generated';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  /**
   * Returns CV data from compiled module
   * @returns Observable of CV data
   */
  loadCvData(): Observable<CvData> {
    return of(CV_DATA);
  }
}
