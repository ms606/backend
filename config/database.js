require('dotenv').config()

module.exports = {
    hrPool: {
        user: process.env.USER,
        password: process.env.PASSWORD,
        connectString: process.env.CONNECTSTRING,
        poolMin: 10,
        poolMax: 10,
        poolIncrement: 0
    }
};