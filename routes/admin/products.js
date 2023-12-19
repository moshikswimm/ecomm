const express = require('express')
const multer = require('multer')

const productsRepo = require('../../repositories/products')
const newProductTemplate = require('../../views/admin/products/new')
const productsIndexTemplate = require('../../views/admin/products/index')
const productEditTemplate = require('../../views/admin/products/edit')
const {validatePrice, validateTitle} = require('./validators')
const {handleErrors, requierAuth} = require('./middlewares')


const router = express.Router()
const upload = multer({storage : multer.memoryStorage()})

router.get('/admin/products',requierAuth, async (req,res) => {
    const products = await productsRepo.getAll()
    res.send(productsIndexTemplate({products}))
})

router.get('/admin/products/new',requierAuth, (req,res) => {
    res.send(newProductTemplate({}))
})

router.post('/admin/products/new',
requierAuth,
upload.single('image'),
[validatePrice, validateTitle],
handleErrors(newProductTemplate),
async (req,res) => {
    const { title, price } = req.body
    const image = req.file.buffer.toString('base64')
    await productsRepo.Create({title,price,image}) 
    res.redirect('/admin/products')
})


router.get('/admin/products/:id/edit', requierAuth,
async (req, res) => {
    const product = await productsRepo.getOne(req.params.id)
    if (!product){
        return res.send('product not found')
    }

    res.send(productEditTemplate({product}))
})

router.post('/admin/products/:id/edit', requierAuth,
upload.single('image'),
[validatePrice, validateTitle],
handleErrors(productEditTemplate, async req =>{
    const product = await productsRepo.getOne(req.params.id)
    return {product}
}),
async (req, res) => {
    const changes = req.body
    if(req.file){
        changes.image = req.file.buffer.toString('base64')
    }
    try{
    await productsRepo.update(req.params.id,changes)
    } catch(err){
        return res.ss('could not find product')
    }
    res.redirect('/admin/products')
}
)

router.post('/admin/products/:id/delete', requierAuth,
    async (req, res) => {
        try{
        await productsRepo.delete(req.params.id)
        } catch(err){
            return res.send('could not find product')
        }
        res.redirect('/admin/products')
    }
)

module.exports = router
