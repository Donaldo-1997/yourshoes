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
    })
    .catch((err) => {
      console.log(err);
    });

});

 router.put("/", async (req, res) => {
      const idAll = req.body.as;
     
      let productId = [];
      let sizeId = [];
      let productArray = [];

      for (let i = 0; i < idAll.length; i++) {
        productId.push(idAll[i].id) && sizeId.push(idAll[i].size);
      }

      for (let i = 0; i < productId.length; i++) {
         const productCopy = await Product.findOne({
          where: { id: productId[i] },
          include: Size,
        })
        productCopy.sizes.find((s) => s.id === sizeId[i]).stock =
        productCopy.sizes.find((s) => s.id === sizeId[i]).stock - 1;

        await productCopy.save();
        productArray.push(productCopy);
      }
      res.status(200).json(productArray)
    });
    

module.exports = router;
