import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoatInfoService {
  private BASE_URI: string;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private httpClient: HttpClient
  ) {
    this.BASE_URI = environment.apiUrl;
  }

  getBoatInfoById(bid: any
    ): Observable<any> {
      return this.httpClient.get(`${this.BASE_URI}/api/boat/getBoatInfoById`, { params: { bid: bid } }).pipe(
        catchError(this.handleError)
      )
    }

    private handleError(error: HttpErrorResponse) {
      let msg = '';    
      
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
        msg = 'An error occurred:', error.error.message;
      } else {
    
      }
      return throwError(msg);
    }
  
}
