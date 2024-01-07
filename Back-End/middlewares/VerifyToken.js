const jwt = require("jsonwebtoken");
 
const verifyToken = (req, res, next) => {
    console.log('Verifying token...');
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        console.log('Token is missing. Sending 401.');
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log('Token verification failed. Sending 403.');
            return res.sendStatus(403);
        }
        req.id = decoded.id;
        console.log('Token verified successfully. Proceeding to the next middleware.');
        next();
    })
}

module.exports = verifyToken; 