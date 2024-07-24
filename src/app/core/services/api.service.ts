import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  get<T>(url: string): Observable<any> {
    return this.http
      .get<T>(url)
      .pipe(take(1))
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            //this.router.navigate(['/login'])
          }
          return this.handleError(error);
        })
      );
  }

  post<T>(url: string, data: any): Observable<any> {
    return this.http
      .post<T>(url, data)
      .pipe(take(1))
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            //this.router.navigate(['/login'])
          }
          return this.handleError(error);
        })
      );
  }

  put<T>(url: string, data: any): Observable<any> {
    return this.http
      .put<T>(url, data)
      .pipe(take(1))
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            //this.router.navigate(['/login'])
          }
          return this.handleError(error);
        })
      );
  }

  delete<T>(url: string): Observable<any> {
    return this.http
      .delete<T>(url)
      .pipe(take(1))
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            //this.router.navigate(['/login'])
          }
          return this.handleError(error);
        })
      );
  }
}
