import express from "express";
import authRoute from "./auth/authRoutes.mjs";
import productRoute from "./product/productRoutes.mjs";

const routerV1 = express.Router()


routerV1.use('/auth', authRoute)
routerV1.use('/product', productRoute)


export default routerV1 