import { dbQuery, dbQueryFirst } from "../db/index"
import { body, validationResult } from 'express-validator';


export type Product = {
    name: string;
    price: number;
    UpdateDate: Date
}

export interface IProduct extends Product {
    id: number;
}



const insertProduct = async (product: Product) => {
    await dbQuery(`INSERT INTO products (name, price, UpdateDate) VALUES(?, ?, ?)`, [product.name, product.price, Date()])
    let returning = await dbQuery(`SELECT id FROM Products WHERE  name = (?)`,[product.name]);
    return getProduct(returning[0].id);
}

const updateProduct = async (product: IProduct) => {
    await dbQuery(`UPDATE products SET name = ?, price = ?, UpdateDate = ? WHERE id = ?`, [product.name, product.price, Date(), product.id])
    return getProduct(product.id);
}

const listProducts = async () => {
    const returning = await dbQuery(`SELECT id,name FROM products`);
    return returning as Product[];
}

const getProduct = async (id: number) => {
    const returning = await dbQueryFirst(`SELECT id,name,price FROM products WHERE id = ?`, [id]);
    return returning as Product | undefined;
}

const deleteProduct = async (id: number) => {
    await dbQueryFirst(`DELETE FROM products WHERE id = ?`, [id]);
}

export const productModel = {
    insertProduct,
    listProducts,
    getProduct,
    deleteProduct,
    updateProduct
}
