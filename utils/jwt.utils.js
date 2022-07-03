const jwt = require('jsonwebtoken')

const JWT_SIGN_SECRET = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYxNjc2NzAxMCwiaWF0IjoxNjE2NzY3MDEwfQ.fsqoAw9ALcsJoN8sAFgazpIhdLhKQ3GK54FT_oIG8sY';

module.exports = {
    generateTokenForUser: (userData) => {
        return jwt.sign({
            userId: userData.id,
            role: userData.role
        }, 
        JWT_SIGN_SECRET,
        {
            expiresIn: '1h',
        })
    },
    parseAutorization: (authorization) => {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
    updateOrder: (authorization) => {
        let isAutorized = false;
        const token = module.exports.parseAutorization(authorization);
        if (token != null){
            const jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
            if (jwtToken != null){
                if(jwtToken.role === 'admin'){
                    isAutorized = true;
                }
            }
        }
        return isAutorized;
    },
    deleteOrder: (authorization) => {
        let isAutorized = false;
        const token = module.exports.parseAutorization(authorization);
        if (token != null){
            const jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
            if (jwtToken != null){
                if(jwtToken.role === 'admin'){
                    isAutorized = true;
                }
            }
        }
        return isAutorized;
    },
}