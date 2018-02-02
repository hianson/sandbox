# sandbox: <a href="https://still-ridge-56336.herokuapp.com/" target="_blank">https://still-ridge-56336.herokuapp.com/</a>

### Making a POST request to /test:

Use a data transfer tool like cURL to make a POST request from the command line. Accepted parameters are strictly 'x' and 'y' with integer values: {x: 4, y: 2}

Using cURL, you can paste this into terminal as a test:

```curl -X POST https://still-ridge-56336.herokuapp.com/test --data '{"x": 4, "y": 2}' -H 'Content-Type: application/json'```

The POST request will simply send back the two values added together as a JSON response:

```{"sum":6}```

Neat!

# What is this?
This is an exercise in essential JS/web dev skills disguised as a multiplayer video game.
Some challenges were decision-making for separating client and server logic since users shouldn't abuse the server.
Converting an object's coordinates from the server to draw it to the canvas was cool, and collision detection was also fun to explore.
Besides that, I made this to practice implementing technologies like:
- Node.js
- Socket.io (real-time communication across browsers)
- Express (serving files, handling CRUD requests w/ bodyParser)
- Canvas (drawing from external images, sprite animation)

# User Interaction
Open the app and control your player using 'WASD' keys, or by clicking on the map. That's it, for now.

p.s. the click listener works on iOS devices apparently!
