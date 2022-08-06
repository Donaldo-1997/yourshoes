const { Router } = require("express");
const { Product, Size } = require("../db");
const router = Router();

    //PUT Stock
    router.put("/", async (req, res) => {
      const { idAll } = req.body;

      let productId = [];
      let sizeId = [];
      let productArray = [];
      let productCopy = [];

      for (let i = 0; i < idAll.length; i++) {
        productId.push(idAll[i].idP) && sizeId.push(idAll[i].idS);
      }
      console.log(productId, "pI")
      for (let i = 0; i < productId.length; i++) {
        productCopy = await Product.findOne({
          where: { id: productId[i] },
          include: Size,
        });
        console.log(productCopy, "PC")
        productCopy.sizes.find((s) => s.id === sizeId[i]).stock =
          productCopy.sizes.find((s) => s.id === sizeId[i]).stock - 1;

        await productCopy.save();
        productArray.push(productCopy);
      }
      console.log(productArray, "PA")
      res.status(200).json(productArray);
    });

        


module.exports= router