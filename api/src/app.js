const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");

require("./db.js");

const server = express();

server.name = "API";

server.use(
  cookieSession({
    name: "session",
    keys: ["google"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

// Initializes passport and passport sessions
server.use(passport.initialize());
server.use(passport.session());
// console.log('URL' ,process.env.CLIENT_URL);
server.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  // const corsWhitelist = [
  //   "http://localhost:3000",
  //   "https://yourshoes.vercel.app",
  // ];
  const corsWhitelist = [ process.env.CLIENT_URL ];

  if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
    res.header("Access-Control-Allow-Origin", req.headers.origin); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, DELETE"
    );
  }

  next();
});

// Routes
server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
