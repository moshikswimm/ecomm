const express = require('express')
const multer = require('multer')
const { validationResult } = require('express-validator')

const products = require('../../repositories/products')
const newProductTemplate = require('../../views/admin/products/new')
const {validatePrice, validateTitle} = require('./validators')


const router = express.Router()
const upload = multer({storage : multer.memoryStorage()})

router.get('/admin/products', (req,res) => {

})

router.get('/admin/products/new', (req,res) => {
    res.send(newProductTemplate({}))
})

router.post('/admin/products/new',
upload.single('image'),
[validatePrice, validateTitle],
async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        console.log(errors)
        return res.send(newProductTemplate({errors}))
    }
    const { title, price } = req.body
    const image = req.file.buffer.toString('base64')
    await products.Create({title,price,image}) 
    res.send('submitted')
})


module.exports = router