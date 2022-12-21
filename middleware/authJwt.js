const jwt = require('jsonwebtoken')

verifyToken = (req, res, next) => {
    let token = req.headers.authorization;
    req.id = ''
    
    //Check is token is available, stop request if the token is not available
    if (!token) {
        return res.status(200).send({
            error: true,
            msg: 'Please login to continue using the service.'
        })
    }
    // Verify if token sent was created using the config secret
    jwt.verify(token, 'muffin', (err, decoded) => {
        //Check is token is valid, stop request if the token is not invalid
        if (err) {
            return res.status(200).send({
                error: true,
                msg: 'Authentication Failed.'
            })
        }
        
        req.id = decoded.id // Get the unecrpyted key and assign to a new request variable DONEEEE
       
       // next() // Continue with request
    })
}
const authJwt = {}
authJwt.verifyToken = verifyToken
module.exports = authJwt