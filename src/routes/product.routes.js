import { Router } from "express";
// import ProductManager from "../dao/productManager.js";
import { productDao } from "../dao/index.js"
import { ProductsController } from "../controllers/products.controller.js";
import { productsCollection } from "../constants/index.js";

const validateFields = (req,res,next)=>{
    const productInfo = req.body;
    if(!productInfo.p_name || !productInfo.p_desc || !productInfo.price){
        return res.json({status:"error",message:"campos incompletos"})
    }else{
        next();
    }
};


const router = Router();

// Ruta raíz GET /api/products/
// Lista todos los productos de la base
router.get("/", ProductsController.getProducts);

// Ruta GET /api/products/:pid
// Obtiene un producto por su ID
router.get("/:pid", ProductsController.getProductById);

// Ruta PUT /api/products/:pid
// Actualiza un producto por su ID
router.post("/", validateFields, ProductsController.setProductById);
  
// Ruta DELETE /api/products/:pid
// Elimina un producto por su ID
router.put("/:pid",validateFields, );

  router.delete("/:pid",validateFields, ProductsController.deleteProductByID);

export { router as productsRouters }; //aca se exporta la ruta a app.js
