import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CvData } from '../models/cv.model';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  constructor(private http: HttpClient) {}

  loadCvData(): Observable<CvData> {
    return this.http.get<CvData>('/assets/data/cv.json');
  }
}
