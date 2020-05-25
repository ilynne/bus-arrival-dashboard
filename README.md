# Bus Arrival Dashboard

Google, OneBusAway, and other apps offer real-time bus arrival information. The OneBusAway app even displays animation with bus locations.

Sometimes you need something much simpler. I live close to two bus stops and different buses that can get me to my destination (work) stop at each of them. A dashboard listing only the buses I am interested in at only the stops I am interested in would be a very good thing in the morning.

The Bus Arrival Dashboard should group the buses by stop and sort them by arrival time. Color coding the arrival times would help me decide which stop to walk toward.

## Wireframes

![](wireframes/Bus Dashboard Wireframes/Bus Dashboard Wireframes.001.png)

![](wireframes/Bus Dashboard Wireframes/Bus Dashboard Wireframes.002.png)

![](wireframes/Bus Dashboard Wireframes/Bus Dashboard Wireframes.003.png)

![](wireframes/Bus Dashboard Wireframes/Bus Dashboard Wireframes.004.png)

![](wireframes/Bus Dashboard Wireframes/Bus Dashboard Wireframes.005.png)

![](wireframes/Bus Dashboard Wireframes/Bus Dashboard Wireframes.006.png)

![](wireframes/Bus Dashboard Wireframes/Bus Dashboard Wireframes.007.png)

## Dependencies

* node-sass
* OneBusAway API
* A back end to send requests to OneBusAway API (Rails API app)
* A host
* Firebase for authentication and user data

## Tasks

 - [ ] Rails backend app
   - Routes
     - [ ] Fetch route info for bus
     - [ ] Fetch arrival info for bus at stop
 - [ ] Find host for Rails app
 - [ ] Create React App
