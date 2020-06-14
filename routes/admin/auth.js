const users = require('../../repositories/users')
const express = require('express')
const signupTemplate = require('../../views/admin/auth/signup')
const signinTemplate = require('../../views/admin/auth/signin')

const router = express.Router()


router.get('/signup', (req, res) => {
    res.send(signupTemplate({req}))
})

router.post('/signup',async (req, res) => {
    const {email, password, passConfirm} = req.body
    const exists = await users.getOneBy({ email })
    if (exists){
        return res.send("Email in use")
    }
    if( password !== passConfirm){
        return res.send("password not match")
    }

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
    res.send(signinTemplate())
})

router.post('/signin',async (req, res) => {
    const { email, password } = req.body
    const user = await users.getOneBy({email})

    if (!user){
        return res.send('user not found')
    }
    const validPass = await users.comparePass(user.password, password)
    if (!validPass){
        return res.send('invalid password')
    }
    req.session.userid = user.id

    res.send('you are signed in')
})

module.exports = router