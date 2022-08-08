const { Router } = require("express");
const router = Router();
// var logger = require('morgan');
// var session = require('express-session');

//--------------------------IMPORT
const shoesRouter = require("./products");
const user = require("./users");
const categories= require("./categories")
const brands= require("./brands");
const login = require('./login')
const auth_email = require('./auth_email')
const mercadoRouter = require("./mercadopago.js")
const size = require("./size")
const nodemailer = require("./nodemailer.js")
const stock = require ("./stock");
<<<<<<< HEAD
const order = require ("./order")
=======
>>>>>>> dfcb69e4dda8ae352f52b6ee9a06260c43a57fa0


//--------------------------ROUTES
router.use("/order", order)
router.use("/stock", stock);
router.use("/auth", auth_email);
router.use("/login", login);
router.use("/user/", user);
router.use("/shoes", shoesRouter);
router.use("/categories", categories);
router.use("/brands", brands);
router.use("/mercadopago", mercadoRouter);
router.use("/size", size);
router.use("/nodemailer", nodemailer);



// router.get('/', (req, res) => {
//     res.send('deploy funcionando')
// })


module.exports = router;