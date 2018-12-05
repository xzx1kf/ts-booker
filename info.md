How should parser work?

	--> populates db instead of returning json of slots

What calls parser?

	--> an async call from booker.
	--> when a booking is scheduled.

How does a court get booked?

	--> currently through book service but should be changed to ts-service.
	--> maybe ts-service should scrape, book, and cancel.

How does ts-booker get updated slot information?

    --> ts-booker should own the database and the ts-booker service should expose an api 
        that updates the database with slot information.


  Workflow
  
    ts-booker --> ts-service.scrape - async call 
    ts-booker <-- ts-service.scrape results - json returned
    ts-booker --> update db

TODO:

  change book service to be ts-service, with scrape, book and cancel api's.
	change bookings/timeslots to just be slots.
