import { Component, OnInit } from '@angular/core';
import { TimeSlot } from '../timeSlot';
import { TIMESLOTS } from '../mock-bookings';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  timeSlots = TIMESLOTS;
  selectedTimeSlot: TimeSlot;
  
  constructor() { }

  ngOnInit() {
  }

  onSelect(timeSlot: TimeSlot): void {
    this.selectedTimeSlot = timeSlot;
  }
}
