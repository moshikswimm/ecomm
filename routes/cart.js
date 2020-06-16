const express = require('express')
const products = require('../repositories/products')
const cartShowTemplate = require('../views/cart/show')

const router = express.Router()

router.post('/cart/products', (req,res) => {
    
    if(!req.session.cart) {
        req.session.cart = {}
        req.session.cart.items = {}
    }
    const items = req.session.cart.items
    if (!items[req.body.productId]){
        items[req.body.productId] = 1
    } else{
        
        items[req.body.productId] = items[req.body.productId] + 1

    }
    req.session.cart.items = items
    res.redirect('/cart')
})

router.get('/cart', async (req, res) => {
    if (!req.session.cart){
        return res.redirect('/')
    }
    let template = {}
    for (let item in req.session.cart.items){
        const product = await products.getOne(item)
        template[item] = {}
        template[item].quantity = req.session.cart.items[item]
        template[item].product = product
    }

    res.send(cartShowTemplate({items: template}))
})


router.post('/cart/products/delete', (req, res) =>{
    const itemId = req.body.deleteId
    if (req.session.cart.items[itemId] > 1) {
        req.session.cart.items[itemId] -= 1
    } else {
        try{
        delete req.session.cart.items[itemId]
        }catch (err){
            throw new Error("delete of none exsiting item")
        }
    }
    res.redirect('/cart')
})

module.exports = router