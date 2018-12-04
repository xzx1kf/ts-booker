import { Component, OnInit } from '@angular/core';
import { TimeSlot } from '../timeSlot';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  //timeSlots = TIMESLOTS;
  timeSlots: TimeSlot[];

  selectedTimeSlot: TimeSlot;
  
  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.getBookings();
  }

  onSelect(timeSlot: TimeSlot): void {
    this.selectedTimeSlot = timeSlot;
  }

  getBookings(): void {
    this.bookingService.getBookings()
      .subscribe(timeSlots => this.timeSlots = timeSlots);
  }
}
