const express = require('express');
const User = require('../models/User');
const router = express.Router(); 
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser')

// ROUTE:1 Create a User using: POST "/api/auth/". Doesn't require Auth
router.post('/createuser', [
     // email must be an email
  body('email', "Email is not valid").isEmail(),
  // password must be at least 5 chars long
  body('name',"Name should be 5 characters long").isLength({ min: 5 }),
  // password must be at least 8 chars long
  body('password', "Password should be 8 characters long").isLength({ min: 8 }),
  
], async (req, res)=>{ 
    let success = false;
    // console.log(req.body)
    // const user = User(req.body);
    // user.save()

    //check validation and is there is empty throw errors and bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    // res.send(req.body);
    try{
    let user = await User.findOne({email: req.body.email}) //check that if user already exist or not
    if (user){
        return res.status(400).json({Error: "Please enter a unique email"})
    }

    let pass = req.body.password
    let salt = await bcrypt.genSalt(10);
    user = await User.create({ //if not than create user
        name: req.body.name,
        password: bcrypt.hashSync(pass, salt),
        email: req.body.email
      })


      const JWT_Signature = "Shahr$u$kh";
      const data = {
          user:{
              id: user.id
          }
      }
      const Token = jwt.sign(data, JWT_Signature)
      success = true;
      res.json({success,Message: "Request Submitted Successfully",Token})
    }
    catch{
        console.log(err)
        res.status(500).send("Some Error Occured")
    }
    //   .then(user => res.json(user))
    //   .catch(err=>{console.log(err)
    //     res.json({Error:"Please Enter an Unique Email", Message: err.message})})
} )


//ROUTE: 2 Login a User using: POST "/api/auth/".

router.post('/login', [
    // email must be an email
 body('email', "Email is not valid").isEmail(),
 // password must be at least 5 chars long
//  body('name',"Name should be 5 characters long").isLength({ min: 5 }),
 // password must be at least 8 chars long
 body('password', "Password should be 8 characters long").exists(),
 
], async (req, res)=>{ 
   // console.log(req.body)
   // const user = User(req.body);
   // user.save()

   //check validation and is there is empty throw errors and bad request
   const errors = validationResult(req);
   let success = false;
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
   const {email,password} = req.body;
    // try {
        let user = await User.findOne({email:req.body.email})
        if (!user) {
            success = false
            res.status(500).json({success,Error: "Please Login with Valid Credentials"})
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch){
            success = false
            res.status(500).json({success, Error: "Please Login with Valid Credentials"})
        }

        const payloadData = {
            user: {
                id: user.id
            }
        }
        const JWT_Signature = "Shahr$u$kh";
        const Token = await jwt.sign(payloadData, JWT_Signature)
        success = true;
        res.json({success,Message: "Request Submitted Successfully",Token})

    })
        //ROUTE: 3 Get a User using: POST "/api/auth/", Login Required
        router.post('/getuser', fetchUser , [         
        ], async (req, res)=>{ 
           

            try {
                userId = req.user.id;
                const user = await User.findById(userId).select("-password")
                res.send(user)
            } catch (error) {
                res.send(500).json({error: "Internal Server Error"})
            }
        })

module.exports = router