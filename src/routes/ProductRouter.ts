import express, { Request, Response, NextFunction } from 'express'
import { productController } from '../controllers/products';
const { body} = require('express-validator');

const InsertProductvalidation = [
    body('name',"Name is required").not().isEmpty(),
    body('name',"Max name length is 100 characters").isLength({max:100}),
    body('price','Price must be number').isNumeric(),
    body('price','Price is required').isFloat({min: 0.01})
]


const ProductRouter = express.Router()

ProductRouter.get('/', productController.listProducts);
ProductRouter.get('/:id', productController.getProduct);
ProductRouter.post('/insert',InsertProductvalidation, productController.insertProduct);
ProductRouter.put('/:id', InsertProductvalidation,productController.updateProduct);
ProductRouter.delete('/:id', productController.deleteProduct);

export default ProductRouter