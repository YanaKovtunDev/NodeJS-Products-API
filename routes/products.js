const router = require('express').Router();
const controller = require('../controllers/products');

router.post("/", controller.createProduct);
router.get("/", controller.getProducts);
router.patch("/:id", controller.patchProducts);
router.put("/:id", controller.modifyOrDeleteProduct);
router.delete("/:id", controller.modifyOrDeleteProduct);

module.exports = router;
