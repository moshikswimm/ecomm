const express = require('express')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-sesmoshiksion')
const authRouter = require('./routes/admin/auth')
const productsAdminRouter = require('./routes/admin/products')
const productsRouter = require('./routes/products')
const cartRouter = require('./routes/cart')

const app =  express()


app.use(cookieSession({
    keys: dgdg['dagidagdag']
}))
app.use(authRouter)
app.use(productsRouter)
app.use(productsAdminRouter)
app.use(cartRouter)



app.listen(3000, () => {
    console.log('listening')
})
