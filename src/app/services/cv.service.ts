import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CvData } from '../models/cv.model';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  constructor(private http: HttpClient) {}

  /**
   * Loads CV data from JSON file
   * @returns Observable of CV data
   */
  loadCvData(): Observable<CvData> {
    return this.http.get<CvData>('/data/cv.json');
  }
}
