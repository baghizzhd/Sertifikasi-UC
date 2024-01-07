const Users  = require('../models/usersModel');
const jwt = require('jsonwebtoken');

const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.sendStatus(401);
        }
        const user = await Users.findAll();
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user[0].id;
            const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '15s'
            });
            res.json({ accessToken });
        });
    } catch (error) {
        console.error('Error in refreshToken:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = refreshToken;  