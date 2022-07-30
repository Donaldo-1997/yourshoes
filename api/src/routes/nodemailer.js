const { Router } = require("express");
const router = Router();
const nodemailer = require('nodemailer');
const { mail } = require("../controllers/nodemailer");





router.post("/", mail)
module.exports = router