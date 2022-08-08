const { Router } = require("express");
const { Product, Size, Order, User } = require("../db");
const router = Router();


router.post("/", async (req, res) => {
   const {idAll} = req.body;
  // console.log(idAll.map(s => s.quantity), "ytdtkuy")
  let productId = [];
  let productArray1 = [];
  let productCopy1;
  let totalUnidades = [];
  let totalTotal = [];  
  let totalTotal1 = 0;
  let quantity1 = [];

  for (let i = 0; i < idAll.length; i++) {
    productId.push(idAll[i].id) && quantity1.push(idAll[i].quantity)
    // console.log(quantity1);
  }   
  
  for (let i = 0; i < productId.length; i++) {    
    productCopy1 = await Product.findOne({
      where: { id: productId[i] },
      // include: [
      //   { model: Order },        
      // ],
    });     
    productArray1.push(productCopy1);
    
  } 

    for(let i = 0; i < productArray1.length; i++){ 
    const totalito = productArray1[i].price * quantity1[i];
    totalUnidades.push(totalito);
      console.log(productArray1[i].price);
     }
    for(let i = 0; i < totalUnidades.length; i++){
      totalTotal1 += totalUnidades[i];
     
      if(i === totalUnidades.length - 1){
        totalTotal = totalTotal1;
        console.log(totalTotal);
      }
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
  

    module.exports= router;


//     //Post Orden Compra
// router.post("/", async (req, res) => {
//     const {idAll} = req.body;
  
//     let productId = [];
//     let productArray1 = [];
//     let productCopy1;
//     let contador = 1;
//     let totalUnidades = [];
//     let totalTotal = [];  
//     let totalTotal1 = 0;
  
//     for (let i = 0; i < idAll.length; i++) {
//       productId.push(idAll[i].id);
//     }  
    
//     for (let i = 0; i < productId.length; i++) {    
//       productCopy1 = await Product.findOne({
//         where: { id: productId[i] },
//         include: [
//           { model: Order },
          
//         ],
//       });     
      
//       if(!productArray1.map(s =>s.productCopy1.id).includes(productId[i])) {
//         productArray1.push({productCopy1, contador});
//         console.log((productArray1.map(s =>s.productCopy1.id)));
//      } else {
//            productArray1.map(p => p).find(s => s.productCopy1.id === productId[i]).contador = contador += 1;      
//           }
//       } 
  
//       for(let i = 0; i < productArray1.length; i++){ 
//         const totalito = productArray1[i].productCopy1.price * productArray1[i].contador;
//       totalUnidades.push(totalito);
//        //console.log(totalUnidades);
//        }
//       for(let i = 0; i < totalUnidades.length; i++){
//         totalTotal1 += totalUnidades[i];
       
//         if(i === totalUnidades.length - 1){
//           totalTotal.push(totalTotal1);
//            console.log(totalTotal);
//         }
//       } 
//       const date = new Date();
      
//           const newOrder = await Order.create({
//           amount: totalTotal,
//           address: "", 
//           email: "", 
//           date: date,
//           status: "realizada"});
//          //  items_ml.map(async (item) => await newOrder.addProduct(item.id));
//           res.status(200).json(newOrder); 
//     });
