const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require('passport-local').Strategy
const { User } = require('../db.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var bCrypt = require('bcrypt-nodejs');

const adminMails = ['donaldojbm7@gmail.com', 'nico.bringas0210@gmail.com', 'juann.carracedo7@gmail.com', 'giseltaboada1990@gmail.com']

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      // passReqToCallback:true
    },
    async function (request, accessToken, refreshToken, profile, done) {
      console.log(profile);

      const email = profile._json.email || profile.emails[0].value

      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          name: profile._json.given_name,
          surname: profile._json.family_name,
          image: profile._json.picture,
          isAdmin: adminMails.includes(profile._json.email)
        }
      })

      return done(null, user);
    }
  )
);

// passport.use('local' ,new LocalStrategy(
//   {
//     usernameField: 'email',
//     passwordField: 'password',
//     passReqToCallback: true // allows us to pass back the entire request to the callback
//   },
//   async function (req, email, password, done) {
//     console.log(email, '----EMAIL')
//     const newUser = await User.findOne({
//       where: {
//         email: email
//       }
//     })

//     console.log(newUser, "NEW_USER")

//     if(!newUser) return done(null, false);

//     return done(null, newUser);
//   }
// ))

//LOCAL SIGNIN
passport.use('local-signin', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
  },

  async function (req, email, password, done) {
      const isValidPassword = function (userpass, password) {

          return bcrypt.compareSync(password, userpass);

      }
      console.log("logged to", email)
      const user = await User.findOne({
          where: {
              email: email
          }
      })
      // .then(function (user) {
      //     // console.log('USER_PASSWORD',user.password)
      //     // console.log('PASSWORD', password)
      //     if (!user) {
      //         return done(null, false, {
      //             message: 'Email does not exist'
      //         });
      //     }

      //     if (!isValidPassword(user.password, password)) {
      //         return done(null, false, {
      //             message: 'Incorrect password.'
      //         });
      //     }

      //     return done(null, user);

      // }).catch(function (err) {

      //     console.log("Error:", err);

      //     return done(null, false, {
      //         message: 'Something went wrong with your Signin'
      //     });

      // });
      return done(null, user);


  }

));

passport.serializeUser(function (user, done) {
  /*
  From the user take just the id (to minimize the cookie size) and just pass the id of the user
  to the done callback
  PS: You dont have to do it like this its just usually done like this
  */
 console.log('SERIALIZER USER',user)
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  /*
  Instead of user this function usually recives the id
  then you use the id to select the user from the db and pass the user obj to the done callback
  PS: You can later access this data in any routes in: req.user
  */
  done(null, user);
});
