'use strict';

import cors from 'cors';
import http from 'http';
import express from 'express';
import SocketIO from 'socket.io';

const port = 3000,
      app = express(),
      server = http.createServer(app),
      io = new SocketIO(server);

app.use(cors());

app.get('/', (req: any, res: any, next: any) => res.json({msg: 'Fuck you'}));

io.on('connection', (socket: any) => {
  console.log('User join your channel!');
  socket.on('disconnect', () => console.log('User left your channel!'));
});

server.listen(port, () => console.log(`CORS-enabled on this son of a bitch of server who's listening on port ${port}`));
