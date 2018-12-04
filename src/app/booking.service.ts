import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { TimeSlot } from './timeSlot';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  private bookingsUrl = 'http://localhost:3000/booker/bookings';

  getBookings(): Observable<TimeSlot[]> {
    return this.http.get<TimeSlot[]>(this.bookingsUrl)
  }
}
