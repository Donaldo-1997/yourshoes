const { payment } = require("mercadopago");
const mercadopago = require("mercadopago");
const { ACCESS_TOKEN } = process.env;
const { Router } = require("express");
const router = Router();
const { Product, Size } = require("../db");


mercadopago.configure({
  access_token: ACCESS_TOKEN,
});

router.post("/", function (req, res) {
  try{
    ordenID = 1;
  if(req.body.as.length===0) res.status(400).send("Carrito vacío")
  const items_ml = req.body.as.map((p) => ({
    name: p.title,
    quantity: p.quantity,
    unit_price: p.price,
  }));
  //creamos un objeto de preferencia
  let preference = {
    items: items_ml,
    external_reference: `${ordenID}`,
    payment_methods: {
      exclude_payments_types: [
        {
          id: "atm",
        },
      ],
      installments: 3,
    },
    back_urls: {
      success: "https://yourshoes.vercel.app/",
      failure: "https://yourshoes.vercel.app/",
    },
  };

  mercadopago.preferences
    .create(preference)
    .then((r) => {
      console.info("respondio");
      (global.id = r.body.id), res.json({ id: global.id });
      console.log(r, "soy r")
    })
    .catch((err) => {
      console.log(err);
    });
 }catch(error){
  console.log(error)
  res.status(404).json(error)
 }
});

router.put("/", async (req, res) => {
  try{
    const idAll = req.body.cart;
  console.log(idAll)
  let productId = [];
  let sizeId = [];
  let productArray = [];

  for (let i = 0; i < idAll.length; i++) {
    productId.push(idAll[i].id) && sizeId.push(idAll[i].sizeNumber);
  }

  for (let i = 0; i < productId.length; i++) {
     const productCopy = await Product.findOne({
      where: { id: productId[i] },include:[{model:Size, where:{number:sizeId[i]}}]})
      const data = productCopy.sizes.map(s=>s.id)
      const data1 = productCopy.sizes.map(s=>s.stock-1)
      const data2 = productCopy.sizes.map(s=>s.solds+1)
    productCopy.removeSize(data)
    const newSize = await Size.create({
      number:sizeId[i],
      stock:data1,
      solds:data2
    })
    await productCopy.addSize(newSize)
    await productCopy.save();
    productArray.push(productCopy);
   }
   res.status(200).json(productArray)
  } catch(error){
    res.status(404).json(error)
  }
});

module.exports = router;
