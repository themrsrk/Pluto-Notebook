const jwt = require('jsonwebtoken');
const JWT_Signature = "Shahr$u$kh";

const fetchUser = (req, res, next) =>{
    //Get the user from JWT token and add it to request object
    const token = req.header('Token');

        if(!token){
            res.status(401).json({error: "Unauthorized access please login using valid token"});
        }
   

            try {
                const data = jwt.verify(token, JWT_Signature )
                req.user = data.user;
                next();
            } catch (error) {
                res.status(401).json({error: "Unauthorized access please login using valid token"});
            }
  
}

module.exports = fetchUser