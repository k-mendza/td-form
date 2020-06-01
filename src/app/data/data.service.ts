import { Injectable } from '@angular/core';
import { UserSettings } from './user-settings';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private static readonly URL = '';

  constructor(private http: HttpClient) { }

  postUserSettings(userSettings: UserSettings): Observable<UserSettings> {
    return this.http.post<UserSettings>(DataService.URL, userSettings);
  }

  getSubscriptionTypes(): Observable<string[]> {
    return this.http.get<string[]>(DataService.URL);
  }
}
