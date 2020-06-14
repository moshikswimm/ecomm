const users = require('../../repositories/users')
const express = require('express')
const { check, validationResult } = require('express-validator')
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
    validatePassConfirm ], async (req, res) => {
        const errors = validationResult(req)  
        if (!errors.isEmpty()){
            return res.send(signupTemplate({req, errors}))
        }  
        const {email, password, passConfirm} = req.body
        
        let newUser = await users.create({email,password})

        // added by cookie session
        req.session.userid = newUser.id    

        res.send('user created')
})


router.get('/signout', (req, res) => {
    req.session = null
    res.send('you are logged out')
})

router.get('/signin', (req, res) => {
    res.send(signinTemplate({}))
})

router.post('/signin',[
    validateEmailExsist,
    validateUserPassword], async (req, res) => {
    const errors = validationResult(req)   
    if (!errors.isEmpty()) {
        return res.send(signinTemplate({errors}))
    }
    const { email } = req.body
    const user = await users.getOneBy({email})

    req.session.userid = user.id

    res.send('you are signed in')
})

module.exports = router