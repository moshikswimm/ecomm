const express = require('express')

const users = require('../../repositories/users')
const {handleErrors} = require('./middlewares')
const signupTemplate = require('../../views/admin/auth/signup')
const signinTemplate = require('../../views/admin/auth/signin')
const { validateEmail, 
    validatePassword, 
    validatePassConfirm,
    validateEmailExsist,
    validateUserPassword } = require('./validators')

const router = express.Router()


router.get('/signup', (req, res) => {
    res.send(signupTemplate({req}))
})

router.post('/signup',[ validateEmail,
    validatePassword,
    validatePassConfirm ],
    handleErrors(signupTemplate), 
    async (req, res) => {
        const {email, password} = req.body      
        let newUser = await users.create({email,password})

        // added by cookie session
        req.session.userid = newUser.id    

        res.redirect('/admin/products')
    })


router.get('/signout', (req, res) => {
    req.session = null
    res.redirect('/signin')
})

router.get('/signin', (req, res) => {
    res.send(signinTemplate({}))
})

router.post('/signin',[
    validateEmailExsist,
    validateUserPassword],
    handleErrors(signinTemplate), 
    async (req, res) => {
    const { email } = req.body
    const user = await users.getOneBy({email})

    req.session.userid = user.id

    res.redirect('/admin/products')
})

module.exports = router