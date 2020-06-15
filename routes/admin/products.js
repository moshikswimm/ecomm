const express = require('express')
const products = require('../../repositories/products')
const newProductTemplate = require('../../views/admin/products/new')
const {validatePrice, validateTitle} = require('./validators')
const { validationResult } = require('express-validator')

const router = express.Router()

router.get('/admin/products', (req,res) => {

})

router.get('/admin/products/new', (req,res) => {
    res.send(newProductTemplate({}))
})

router.post('/admin/products/new',
[validatePrice, validateTitle],
(req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        console.log(errors)
        return res.send(newProductTemplate({errors}))
    }
    
})


module.exports = router