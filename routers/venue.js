const express = require("express");
const router = new express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require('../models/user')
const Venue = require("../models/venue")

router.get("/venues", auth, async (req, res) => {

})