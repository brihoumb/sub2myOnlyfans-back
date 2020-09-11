'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
const port = 3000, app = express_1.default(), server = new http_1.default.Server(app), io = new socket_io_1.default(server);
console.log('-=- cors my ass -=-');
app.use(cors_1.default());
console.log('-=- init route -=-');
app.get('/', (req, res, next) => res.json({ msg: 'Fuck you' }));
console.log('-=- init socket -=-');
io.on('connection', (socket) => {
    console.log('Someone connected');
    socket.on('ping', () => { socket.emit('pong'); });
});
//app.listen(port, () => console.log(`CORS-enabled on this son of a bitch of server who's listening on port ${port}`));
server.listen(port, () => console.log(`CORS-enabled on this son of a bitch of server who's listening on port ${port}`));
//# sourceMappingURL=index.js.map