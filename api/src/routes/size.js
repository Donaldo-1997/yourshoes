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
<<<<<<< HEAD
    let sizeProduct = [{id: 1, number:35, stock:5, counter:0}, {id: 2,number:36, stock:5, counter:0},{id: 3, number:37, stock:5, counter:0},{id: 4, number:38, stock:5, counter:0},{id: 5, number:39, stock:5, counter:0},{id: 6, number:40, stock:5, counter:0},{id: 7, number:41, stock:5, counter:0},{id: 8, number:42, stock:5, counter:0},{id: 9, number:43, stock:5, counter:0},{id: 10, number:44, stock:5, counter:0},{id: 11, number:45, stock:5, counter:0}]
      
      sizeProduct.forEach(async (s) => {
=======
    const sizeProduct = await Product.findAll();
    const sizePmap = sizeProduct.map(i => i.size);
 
      const setSize = [...new Set(sizePmap.map(JSON.stringify))].map(e => JSON.parse(e))
      // console.log(setSize);
      //me la llevo para toda la vida

      setSize.forEach(async (s) => {
>>>>>>> 04789e182cca98af39147de623d12af6bdabdf6e
        await Size.findOrCreate({
          where: { id: s.id },
          defaults: { stock: s.stock, counter: s.counter, number: s.number }
        })
      })
<<<<<<< HEAD
      res.status(200).json(sizeProduct);
=======
      res.status(200).json(setSize);
>>>>>>> 04789e182cca98af39147de623d12af6bdabdf6e
    } else {
      res.status(200).json(sizeDb);
    }
    } catch (err) {
    res.status(404).json(err);
  }
});

<<<<<<< HEAD
=======



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


>>>>>>> 04789e182cca98af39147de623d12af6bdabdf6e
module.exports = router