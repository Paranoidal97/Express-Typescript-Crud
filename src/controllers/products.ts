import { Request, Response } from 'express';
import { badRequest, internalServerError, validateNumber, notFound, ok } from '../services/util';
import { Product, IProduct, productModel } from '../models/ProductModel';
import { validationResult } from 'express-validator';

const insertProduct = (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const product = req.body as Product;
            return productModel.insertProduct(product)
            .then(product => {
                res.json(product);
            })
            .catch(err => internalServerError(res, err));
}


const updateProduct = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = parseInt(req.params.id);

    if(!validateNumber(id))
        return badRequest(res, 'id is not valid');

       

    const product = req.body as IProduct;
    return productModel.updateProduct(product)
        .then(product => {
            res.json(product)
        })
        .catch(err => internalServerError(res, err));
}


const listProducts = ({}: Request, res: Response) => {
    productModel.listProducts()
        .then(products => {
            res.json(products)
        })
        .catch(err => internalServerError(res, err));
}

const getProduct = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if(!validateNumber(id))
        return badRequest(res, 'id is not valid');


    return productModel.getProduct(id)
        .then((product) => {
            if(product)
                return res.json(product);
            else
                return notFound(res);
        })
        .catch(err => internalServerError(res, err));
}

const deleteProduct = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id is not valid');

        const productSaved = await productModel.getProduct(id);
        if(!productSaved)
            return notFound(res);
    }

    return productModel.deleteProduct(id)
        .then(() => ok(res))
        .catch(err => internalServerError(res, err));
}

export const productController = {
    insertProduct,
    listProducts,
    getProduct,
    deleteProduct,
    updateProduct
}