import { readFileSync } from 'fs';
import { Socket } from 'socket.io';
import Event from '../api/event';

let wait: boolean;
let playerEvent: Event;
let turn: { [k: string]: any };

export const initSocket = () => {
  wait = false;
  playerEvent = new Event();
  turn = playerEvent.roll(-1);
  Object.assign(turn, playerEvent.metaData());
};

export const create = (socket: Socket) => {
  if (!wait) {
    if (turn.imgPath !== '') {
      turn.imgPath = Buffer.from(readFileSync(`assets/${turn.imgPath}`)).toString('base64');
    }
    socket.emit('answer', JSON.stringify(turn));
    wait = true;
  }
};

export const reply = (msg: string, socket: Socket) => {
  if (!Number.isNaN(parseInt(msg, 10)) && wait) {
    turn = playerEvent.roll(parseInt(msg, 10));
    Object.assign(turn, playerEvent.metaData());
    wait = false;
    if (!playerEvent.isAlive()) {
      socket.emit('dead', JSON.stringify(turn));
    }
  }
};
