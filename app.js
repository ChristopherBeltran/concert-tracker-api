const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const concertRouter = require("./routers/concert")
const venueRouter = require("./routers/venue")
const artistRouter = require("./routers/artist")

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(concertRouter);
app.use(venueRouter)
app.use(artistRouter)

module.exports = app;