const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

const connectDB = require('./src/config/db');
const socketEvents = require('./socketEvents');

const authRouter = require('./src/routes/authRouter');
const testRouter = require('./src/routes/testRouter');
const problemRouter = require('./src/routes/problemRouter');
const compileRouter = require('./src/routes/compileRouter');

dotenv.config();

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use(fileUpload());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

app.use('/api/auth', authRouter);
app.use('/api/tests', testRouter);
app.use('/api/problems', problemRouter);
app.use('/api/compile', compileRouter);

// Configure CORS for Socket.IO server
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Use socketEvents to handle socket events
socketEvents(io);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
