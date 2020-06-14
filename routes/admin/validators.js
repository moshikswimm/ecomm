const {check} = require('express-validator')
const users = require('../../repositories/users')

module.exports = {
    validateEmail: check('email')
    .trim()
    .normalizeEmail()
    .isEmail().withMessage('Must be a valid email')
    .custom(async (email) => {
        const exists = await users.getOneBy({ email })
        if (exists){
            throw new Error('Email in use')
        }
    }),
    validatePassword: check('password')
    .trim()
    .isLength({ min:4, max:20 }).withMessage('must be 4 to 20 characters'),
    validatePassConfirm: check('passConfirm')
    .trim()
    .isLength({ min:4, max:20 }).withMessage('must be 4 to 20 characters')
    .custom((passConfirm, {req}) => {
        if( req.body.password !== passConfirm){
            throw new Error("password not match")
        } else{
            return true
        }
    }),
    validateEmailExsist:     check('email')
    .trim()
    .normalizeEmail()
    .isEmail().withMessage('email is not in the correct format')
    .custom(async email => {
        const user = await users.getOneBy({email})

        if (!user){
            throw new Error('user not exists')
        }
    }),
    validateUserPassword: check('password')
    .trim()
    .custom(async (password, {req}) =>{
        const user = await users.getOneBy({email: req.body.email})
        if (!user){
            throw new Error('invalid password')
        }
        const validPass = await users.comparePass(user.password, password)
        if (!validPass){
            throw new Error('invalid password')
        }
    })
}