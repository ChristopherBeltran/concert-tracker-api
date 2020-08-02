const express = require("express");
const router = new express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require('../models/user')
const Artist = require("../models/artist")

router.get("/artists", auth, async (req, res) => {

})