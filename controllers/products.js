const Products = require('../models/products');

const createProduct = async (req, res) => {
    const body = req.body;
    try {
        const response = await Products.create({...body, isPublished: false})
        return res.status(201).json(response)
    } catch (error) {
        return res.status(404).json({message: "Error with creating product: ", error})
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Products.findAll({order: [["id", "ASC"]]})
        return res.status(200).json(products)
    } catch (error) {
        return res.status(404).json({message: "Error with getting products: ", error})
    }
}

const patchProducts = async(req, res) => {
    const id = req.params.id;
    try {
        const product = await Products.findByPk(id);
        if(!product) {
            return res.status(404).json({message: "ID not found"})
        }
        if(product.mrp >= product.price && product.stock > 0) {
             await Products.update(req.body, {
                where: {
                    id: id
                }
            })
            return res.status(204).end()
        }

        if(product.stock === 0 && product.mrp < product.price) {
            return res.status(422).json(["MRP should not be less than equal to the Price", "Stock count is 0"])
        }

        if(product.stock === 0) {
            return res.status(422).json(["Stock count is 0"])
        }

        if(product.mrp < product.price) {
            return res.status(422).json(["MRP should not be less than equal to the Price"])
        }

    } catch (error) {
        return res.status(400).json({message: "Error with updating products: ", error})
    }
}

const modifyOrDeleteProduct = async (req, res) => {
    try {
        return res.status(405).json({message: "Method Not Allowed"})
    } catch (error) {
        return res.status(404).json({message: "Error with modifying products: ", error})
    }
}

module.exports = {
    createProduct, getProducts, patchProducts, modifyOrDeleteProduct
}