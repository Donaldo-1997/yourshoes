const { Router } = require("express");
const router = Router();
// var logger = require('morgan');
// var session = require('express-session');

//--------------------------IMPORT
const shoesRouter = require("./products");
const categories= require("./categories")
const brands= require("./brands");
// const login = require('./login')
// const auth_email = require('./auth_email')
// const mercadoRouter = require("./mercadopago.js")

//--------------------------ROUTES
// router.use("/auth", auth_email)
// router.use("/login", login)
// router.use("/user/", user);
router.use("/shoes", shoesRouter);
router.use("/categories", categories);
router.use("/brands", brands)
// router.use("/mercadopago", mercadoRouter)

router.get('/', (req, res) => {
    res.send('deploy funcionando')
})


module.exports = router;