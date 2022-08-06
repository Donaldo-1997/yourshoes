const { payment } = require("mercadopago");
const mercadopago = require("mercadopago");
const { ACCESS_TOKEN } = process.env;
const { Router } = require("express");
const router = Router();
const { Product, Size, Order } = require("../db");


mercadopago.configure({
  access_token: ACCESS_TOKEN,
});

router.post("/", async (req, res) => {
  
  try{
    ordenID = 1;
  // if(req.body.as.length===0) res.status(400).send("Carrito vacío")
  const {items_ml} = req.body
  const precio = items_ml.map(r => parseFloat(r.unit_price) * parseFloat(r.quantity)).reduce((a, b) => a + b);
  // .as.map((p) => ({
  //   name: p.title,
  //   quantity: p.quantity,
  //   unit_price: p.price,
  //   size: p.sizeNumber,
  // }));
  //creamos un objeto de preferencia
  // let preference = {
  //   items_ml: items_ml,
  //   external_reference: `${ordenID}`,
  //   payment_methods: {
  //     exclude_payments_types: [
  //       {
  //         id: "atm",
  //       },
  //     ],
  //     installments: 3,
  //   },
  //   back_urls: {
  //     success: "https://yourshoes.vercel.app/",
  //     failure: "https://yourshoes.vercel.app/",
  //   },
  // };

  // mercadopago.preferences
  //   .create(preference)
  //   .then((r) => {
  //     console.info("respondio");
  //     (global.id = r.body.id), res.json({ id: global.id });
      
      
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  let productId = [];
   
  for (let i = 0; i < items_ml.length; i++) {
    productId.push(items_ml[i].id);
  }

  for (let i = 0; i < productId.length; i++) {
     const productCopy1 = await Product.findOne({
      where: { id: productId[i] }})
     }
   const date = new Date();
   console.log(date);
      console.log(items_ml.map(s => s.price));
      console.log(items_ml);
       const newOrder = await Order.create({amount: items_ml.map(s => parseFloat(s.price)),
       address: "", 
       email: "", 
       date: date,
       status: "realizada"});
      //  items_ml.map(async (item) => await newOrder.addProduct(item.id));
       res.status(200).json(newOrder);
       
} catch (err) {
  console.log(err);
  res.status(404).json(err);
}
});

router.put("/", async (req, res) => {
  const idAll = req.body.cart;

  let productId = [];
  let sizeId = [];
  let productArray = [];

  for (let i = 0; i < idAll.length; i++) {
    productId.push(idAll[i].id) && sizeId.push(idAll[i].sizeNumber);
  }

  for (let i = 0; i < productId.length; i++) {
     const productCopy = await Product.findOne({
      where: { id: productId[i] }})
    const data =productCopy.size.find((s) => s.id === sizeId[i]).stock =
    productCopy.size.find((s) => s.id === sizeId[i]).stock - 1;
      console.log(data,"data")
   const info= productCopy.size.map(s=> s===data? s.set({
       stock: s.stock-1
    }):s)
    console.log(info)
    productCopy.set({size:[info]})
    await productCopy.save();
    productArray.push(productCopy);
   }
   res.status(200).json(productArray)
  
});

// router.post("/", async (req, res) => {
//   const { user_id, email, items } = req.body;
//   const precio = items.map(r => parseFloat(r.unit_price) * parseFloat(r.quantity)).reduce((a, b) => a + b);
  
//   try {
//       const date = new Date();
//       const found = await Customer.findByPk(user_id);
//       const obj = {
//           amount: precio, // monto 
//           address: "", // direccion de envio
//           email: email, 
//           date: date,
//           status: "realizada"
//       };
//       const newOrder = await Order.create(obj);
//       newOrder.addCustomer(found);
//       items.map(async (item) => await newOrder.addProduct(item.id));
//       newOrder.addProduct();
//       res.send(newOrder);
//   } catch (error) {
//       res.status(404).send({ error: error.message });
//   };
// });




module.exports = router;
