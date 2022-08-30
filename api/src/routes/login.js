const { Router } = require('express');
const { User, Order } = require('../db.js');
const { Op } = require('sequelize')
const { validateAttributes, validateAttribute } = require('../controllers/validation');
const router = Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { mail } = require('../controllers/nodemailer');
const passport = require('passport');


router.post("/signup", async (req, res) => {
  try {
    let password = req.body.password

    if (password && password.length < 6) res.send('La contraseña no puede ser menor a 6 caracteres');

    password = password ? bcrypt.hashSync(password, Number.parseInt(process.env.AUTH_SECRET)) : null

    const { name, surname, image, username, email, phone_number, date_of_Birth, address } = req.body

    console.log(req.body, 'BODY')


    const [newUser, created] = await User.findOrCreate({
      where: {
        email
      },
      defaults: {
        name,
        surname,
        username,
        phone_number,
        date_of_Birth,
        address,
        password,
        image,
        isAdmin: email === "isAdmin@gmail.com" ? true : false
      },
    })

    let token = jwt.sign({ user: newUser }, process.env.AUTH_SECRET, {
      expiresIn: process.env.AUTH_EXPIRES
    });

    if (!created) res.status(201).send('There is already a user with that email')
    else {
      console.log('mail', typeof mail)
      const user = await User.findOne({ where: { email }, include: [{ all: true }] })

      await mail(email)
      res.status(200).json({
        user: user,
        token: token
      });
    }

  }
  catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
});

router.post("/signin", async (req, res) => {

  try {
    let { email, password } = req.body;
    console.log("email: ", email, "pass: ", password)

    const user = await User.findOne({
      where: {
        email: email
      },
      include: [{ all: true }]
    })
    if (!user) {
      res.status(404).json({ msg: "Email o contraseña incorrecta" });
    } else {

      password = password ? password : bcrypt.hashSync(email, Number.parseInt(email))
      
      if (bcrypt.compareSync(password, user.password)) {

        // Creamos el token
        let token = jwt.sign({ user: user }, process.env.AUTH_SECRET, {
          expiresIn: process.env.AUTH_EXPIRES
        });

        res.json({
          user: user,
          token: token
        })

      } else {

        // Unauthorized Access
        res.status(401).json({ msg: "Email o contraseña incorrecta" })
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;