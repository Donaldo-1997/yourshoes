const { Router } = require("express");
const { Product, Size, Order, User } = require("../db");
const router = Router();
const axios = require("axios")

//Post Orden Compra
router.post("/", async (req, res) => {
  const  idAll  = req.body.as;
  
  const userBody = req.body.userId
  
  try {
    let productId = [];
    let productArray1 = [];
    let contador = 1;
    let totalUnidades = [];
    let totalTotal = [];
    let totalTotal1 = 0;

    const userId = await User.findOne({
      where: { id: userBody}
    });
    for (let i = 0; i < idAll.length; i++) {
      productId.push(idAll[i].id);
    }
    for (let i = 0; i < productId.length; i++) {
      const productCopy1 = await Product.findOne({
        where: { id: productId[i] }
      });
    
      if (!productArray1.map(s => s.productCopy1.id).includes(productId[i])) {
        productArray1.push({ productCopy1, contador });
      
      } else {
        productArray1.map(p => p).find(s => s.productCopy1.id === productId[i]).contador = contador += 1;
      }
    }

    for (let i = 0; i < productArray1.length; i++) {
      const totalito = productArray1[i].productCopy1.price * productArray1[i].contador;
      totalUnidades.push(totalito);
   
    }
    for (let i = 0; i < totalUnidades.length; i++) {
      totalTotal1 += totalUnidades[i];

      if (i === totalUnidades.length - 1) {
        totalTotal.push(totalTotal1);
       
      }
    }
    const date = new Date();
    
    const newOrder = await Order.create({
      amount: totalTotal,
      address: userId.address,
      email: userId.email,
      date: date,
      status: "realizada"
    });
    await newOrder.setUser(userId.id);
    idAll.map(async (item) => await newOrder.addProduct(item.id));
    
    res.status(200).json(newOrder);
   
  } catch (error) {
    console.log(error)
    res.status(404).json(error)
  }
});

router.get("/", async (req, res) => {
  const { email } = req.body; //falta mandar email del profile
  try {
    if (!email) {
      const result = await Order.findAll({ include: { all: true } })
      res.send(result)
    } else {
      const result = await Order.findAll({ where: { order_email: email }, include: { all: true } })
      res.send(result)
    }

  } catch (error) {
    res.status(404).send({ error: error.message })
  }
})


module.exports = router;