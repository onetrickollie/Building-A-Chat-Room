# Building-A-Chat-Room
https://anonymouschat-lwyq.onrender.com

Anonymous Chat Application
==========================

Overview
--------
This project is an anonymous chat application built with:

- Languages: JavaScript, HTML, CSS
- Framework: Socket.IO for real-time communication

Purpose
-------
Why did I build this?

- To create a simple, anonymous chat platform.
- To enable users to join different chat rooms and interact in real-time.
- To provide a fun and engaging user experience with random profile pictures and live activity indicators.

How It Works
------------
Here’s a quick breakdown of how the app functions:

- Real-time Messaging:
  - Uses Socket.IO to manage real-time communication.
  - Instant message exchange and activity updates.

- User Profiles:
  - Each user gets a profile picture (either predefined or a default).
  - Profile pictures are displayed next to each user’s messages.

- Chat Rooms:
  - Users can join specific rooms.
  - The app shows a list of active users and available rooms.

- Activity Indicator:
  - Shows when someone is typing, adding a dynamic feel to the chat.

- User Interface:
  - Built with HTML and CSS.
  - Designed for a clean, fun, and easy-to-use experience.


Running the Application Locally
-------------------------------
Want to try it out on your machine? Here’s how:

1. Clone the Repository:
   git clone https://github.com/onetrickollie/Building-A-Chat-Room

2. Install Dependencies & Start the Server:
   npm install
   npm start

3. Access the Application:
   Open your browser and go to http://localhost:3500.

Note: Before pushing any changes, remember to update the WebSocket URL in app.js to match your production environment.

Enjoy chatting anonymously and feel free to explore or modify the code to suit your needs!


# July 12th 2024
- Project Started
- Socket created
- App can communicate with its own device, but not yet with other device
- Socket.io server side setup completed
- Socket.io client side setup completed
- App can now commuicate between two sockets(is this the right term??)
- App now shows connection status
- App now shows typing status
- Logic Completed

# July 14th 2024
- Background img updated
- Profile picture feature add
- Type in "kirby" in name for a secret pfp
- Type in "mt" in name for a secret pfp
  
# July 15th 2024
- New PFP options added  







