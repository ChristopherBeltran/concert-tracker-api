const express = require("express");
const router = new express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require('../models/user')
const Concert = require("../models/concert")

router.get("/concerts", auth, async (req, res) => {

})

router.post("/concerts", auth, async (req, res) => {

})

router.get("/concerts/:id", auth, async (req, res) => {

})

router.patch("/concerts/:id", auth, async (req, res) => {

})

module.exports = router;