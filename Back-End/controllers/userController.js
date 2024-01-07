const Users = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Login = async(req, res) => {
    try {
        const now = new Date(new Date().getTime() + 7 * 60 * 60 * 1000);
        const options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Asia/Jakarta', // Set the time zone to Indonesian time (Asia/Jakarta)
        };
        const time_now = now.toLocaleString('en-ID', options);

        const user = await Users.findAll({
            where:{
                username: req.body.username
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        const userId = user[0].id;
        const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await Users.update({last_login : time_now},{
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 //1 day
        }); 
        res.json({ accessToken, role_id: user[0].role_id });

    } catch (error) {
        console.log(error)
        res.status(404).json({msg:"Username not found"});
    }

}

const Logout = async(req, res) => {
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}

const fetchUserNickname = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user_id = decodedRefreshToken.userId;    
    try {
      const user = await Users.findOne({
        attributes: ['name', 'role_id'],
        where: { id: user_id },
      });
  
      if (user) {
        res.json({
          result: true,
          user: user,
          message: 'Successfully fetching nickname',  
        });
      } else {
        res.status(404).json({
          result: false,
          message: 'User not found',
        });  
      }

    } catch (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({
        error: 'Internal server error',
      });
    }
  };

module.exports = {
    Login,
    Logout,
    fetchUserNickname 
};
