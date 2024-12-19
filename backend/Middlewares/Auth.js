
const jwt = require('jsonwebtoken');
const ensureAuthenticated = (req,res,next)=>{
    const auth = req.header['authorization'];
    if(!auth){
        return res.status(403)
            .json({message: 'Unauthorized, JWT token is required'});
    }
    try{
        const decided = jwd.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err){
        return res.status(403)
            .json({message: 'Unauthorized, JWT token is incorrect or expired'});
    }
}

module.exports = ensureAuthenticated;