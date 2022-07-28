const { Router } = require("express");
const router = Router();
const products = require("./products");

router.get('/', (req, res) => {
    res.send('deploy funcionando')
})

router.use("/shoes", products);

module.exports = router;