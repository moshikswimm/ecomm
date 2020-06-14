const express = require('express')
const bodyParser = require('body-parser')
const users = require('./repositories/users')
const cookieSession = require('cookie-session')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieSession({
    keys: ['dagidagdag']
}))

app.get('/signup', (req, res) => {
    res.send(
        `<div>
            Your id is: ${req.session.userid}
            <form method="POST">
                <input name="email" placeholder="email" />
                <input name="password" placeholder="password" />
                <input name="passConfirm" placeholder="password" />
                <button>Signup</button>
            </form>
        </div>`
    )
})

app.post('/signup',async (req, res) => {
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


app.get('/signout', (req, res) => {
    req.session = null
    res.send('you are logged out')
})

app.get('/signin', (req, res) => {
    res.send(`
    <div>
        <form method="POST">
            <input name="email" placeholder="email" />
            <input name="password" placeholder="password" />
            <button>Sign in</button>
        </form>
    </div>`)
})

app.post('/signin',async (req, res) => {
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

app.listen(3000, () => {
    console.log('listening')
})