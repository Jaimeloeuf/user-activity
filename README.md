# User Activity App
This is a web-app designed to keep track of the activities the user completed at your event / booth.  
Offer things like scoring system and user activity and flow tracking.


## Specs and requirements
User shouldn't be required to download anything onto their phones.  
Thus this system will need to use other aspects of the user's device to facilitate the goal.  

Available tech that we are targetting:
- Built in Camera
- User's own browser

Specs and goals:
- Super easy to use for the user
- A way to track the user without needing users to create an account or what not.
- Safe and secure

Based on the specified requirements, we can build a system that is:
- A QR code activated link system.
- Only show the qr code when user is done. Qr code is always changing. 
- Able to track users based on cookies on their phones. Thus no user accounts are needed. Their phone is the account.
- Very similar to the MP attendance taking software.


## Tech stack
#### Front-end:
- Vue JS
#### Back-end:
- Firebase as Managed backend (DBaaS / Serverless provider)
- Express on Node JS  (Running on Google Cloud Functions)


## Routes:
- Actual page that shows QR (admin only)
- link opened by scanning QR
- My stats (to see my completed activities)


#### Server routes
- POST /participant/completed/:activityID ? :boothID
    - Payload: Post the timestamp read from the QR code. This acts as the so called pass code.
    - The JWT they have will also be posted together, if they have it.
    - If this is the first activity they did then doesn't matter. User will just get a new JWT.

- GET /participant/stats
    - For the participant to see all the stuff they completed and the points they currently have.
    - In the SPA maybe include a expandable list to show the available items

- GET /admin/qr
    - This will most likely be a websocket connection to allow the QR to always change


## Use case and flow:
- User complete any activity at your booth that which you decide. Show them the QR code to scan.
- Once scanned, they will be presented with a link to open, in which they need to open up themselves.
- Once the link is opened, and the payload is verified, then server will generate and respond with a JWT


## MISC. Notes
- All the things will use JWTs to encode data instead of storing on the server side!
- Server side is just used to collect basic stats like how many user went to what booth and what not.
- Admin have a admin panel where they can specify points for each activity instead of hardcoding them into the app.
- All these activity and points associated with them will all be stored in on firestore.
- QR encodes a URL that specifies the booth number and also the current timestamp.
- Timestamp will be posted so URL can't be shared. The timestamp is like a pass code than is server generated, so server will compare value against the pass code they generated.


## License
This is project is made available open source under the    liscense!  
However do use this at your own risk, there may be breaking changes and all.  
Contact me if you need more details!