const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async (req, res, next) => {
    const token = req.cookies.auth_token;

    if(!token)
    {
        return res.json({
            msg: 'No auth token received'
        })
    } 

    try {
        
        const { userName, _id } = jwt.verify(token, config.get("jwtSecret"));
        req.user = { userName, id: _id };
        next();
        
    } catch (err) {
        return res.json({
            msg: 'Token  not valid'
        })
    }

}