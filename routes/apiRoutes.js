const express = require('express');
// const Products = require('../models/products')
const router = express.Router();

//Products model are going be used to for any activity we will perform 

//submit product is (/api/products/post)
router.post('/post', async (req, res) => {
    const postProduct = new Products({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image
    });

    try {
        const savedPost = await postProduct.save();
        res.send(savedPost);

    } catch (err) {
        res.json({ message: err })
    }

})

//get all products is (/api/products/all)
router.get('/all', async (req, res) => {
    try {
        const getProduct = await Products.find();
        console.log(getProduct);
        res.json(getProduct);
    } catch (erf) { res.send({ errHappend: err }) };
})

// router.get('/barcode/:number', async (req, res) => {
//     // return axios.get(
//     //     proxyUrl + barcodeUrl + barcodeInput + "&formatted=y&key=" + API_KEY
//     //   );
//     console.log(process.env.API_KEY);
// })


//get specific post ("/api/products/id=" + id)
router.get('/id=/:productId', async (req, res) => {
    try {
        const singleProduct = await Products.findById(req.params.productId)
        res.json(singleProduct)
    } catch (err) { res.json({ message: err }) }

})

//delete product ("/api/products/del/id=" + id)

router.delete('/del/id=/:productId', async (req, res) => {
    try {
        const deletedProduct = await Products.remove({ _id: req.params.productId });
        res.json(deletedProduct);
    } catch (err) { res.json({ message: err }) }

})

//udate one ("/api/products/udate/id=" + id)
router.patch('/update/id=/:productId', async (req, res) => {
    try {
        const productUpdate = await Products.updateOne(
            { _id: req.params.productId },
            { $set: { title: req.body.title } }
        );
        res.json(productUpdate);
    } catch (err) { res.json({ message: err }) }
})

module.exports = router;