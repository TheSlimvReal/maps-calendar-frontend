# Maps integrated Calendar

This project follows the idea to have a calendar that focuses on the geographic location of the entries.
On the main page you get an geographic overview of your schedule for the next 24 hours.
Additionally it allows you to register your current location to mark events as attended.
Based on this information the app creates personal reports about the percentage of attended events.

## Running it

In order to use it, you need to run the [backend](https://github.com/TheSlimvReal/maps-calendar-backend).
When this is running you need to specify the correct endpoints in the [calendar service](https://github.com/TheSlimvReal/maps-calendar-frontend/blob/master/src/app/calendar.service.ts) and add your Google Maps API key in the [index.html](https://github.com/TheSlimvReal/maps-calendar-frontend/blob/master/src/index.html).

When this is done run 
> npm install && npm run serve

Have fun and start contribute.
