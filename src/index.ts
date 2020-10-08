'use strict';

import cors from 'cors';
import http from 'http';
import express from 'express';
import SocketIO from 'socket.io';
import morgan from "morgan";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const port = 3000,
      app = express(),
      server = http.createServer(app),
      io = new SocketIO(server);
const userRoutes = require("./API/routes/user");

// Database
mongoose.connect("mongodb+srv://admin:" + "admin" + "@area-data-d0l2g.mongodb.net/test?retryWrites=true", { useNewUrlParser: true, useUnifiedTopology: true });

// Connection
app.use(morgan("dev"));

// Parse body in request
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Handling CORS error
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// Routes
app.use("/user", userRoutes);
app.get('/', (req: any, res: any, next: any) => res.json({msg: 'Fuck you'}));

//Handle errors
app.use((error: { status: any; message: any; }, req: any, res: { status: (arg0: any) => void; json: (arg0: { error: { message: any; }; }) => void; }, next: any) => {
  res.status(error.status || 500);
  res.json({
      error: {
          message: error.message
      }
  });
});


app.use(cors());

io.on('connection', (socket: any) => {
  console.log('User join your channel!');
  socket.on('disconnect', () => console.log('User left your channel!'));
});

server.listen(port, () => console.log(`CORS-enabled on this son of a bitch of server who's listening on port ${port}`));
