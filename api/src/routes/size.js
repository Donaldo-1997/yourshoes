const { Router } = require("express");
const { Product, Size } = require("../db");
const router = Router();
const axios = require("axios");
const { getDbSize } = require("../controllers/index.js");
const { defaults } = require("pg");

router.get("/", async (req, res) => {
  try {
    const sizeDb = await getDbSize();

    if(!sizeDb.length){
    const sizeProduct = await Product.findAll();
    const sizePmap = sizeProduct.map(i => i.size);
 
      const setSize = [...new Set(sizePmap.map(JSON.stringify))].map(e => JSON.parse(e))
      // console.log(setSize);
      //me la llevo para toda la vida

      setSize.forEach(async (s) => {
        await Size.findOrCreate({
          where: { id: s.id },
          defaults: { stock: s.stock, counter: s.counter, number: s.number }
        })
      })
      res.status(200).json(setSize);
    } else {
      res.status(200).json(sizeDb);
    }
    } catch (err) {
    res.status(404).json(err);
  }
});




router.post("/", async (req, res) => {
  try {
    const {
      number,
      stock,
      counter
    } = req.body

    const newSize = await Size.create({
      number, stock, counter      
    })
   res.status(200).json(newSize);
  } catch (error) {
    console.log(error)
    res.status(404).json(error)
  }
})


module.exports = router