const express = require('express')
const bodyParser = require('body-parser')
const users = require('./repositories/users')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send(
        `<div>
            <form method="POST">
                <input name="email" placeholder="email" />
                <input name="password" placeholder="password" />
                <input name="passConfirm" placeholder="password" />
                <button>Signup</button>
            </form>
        </div>`
    )
})

app.post('/',async (req, res) => {
    const {email, password, passConfirm} = req.body
    const exists = await users.getOneBy({ email })
    if (exists){
        return res.send("Email in use")
    }
    if( password !== passConfirm){
        return res.send("password not match")
    }
    res.send('user created')
})

app.listen(3000, () => {
    console.log('listening')
})