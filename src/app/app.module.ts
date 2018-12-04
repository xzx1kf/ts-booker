import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BookingsComponent } from './bookings/bookings.component';

@NgModule({
  declarations: [
    AppComponent,
    BookingsComponent
  ],
  imports: [
    BrowserModule,
    [BrowserAnimationsModule],
    HttpClientModule,
    [MatGridListModule],
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
