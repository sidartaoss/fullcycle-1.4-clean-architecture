import express, { Request, Response } from "express"
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
    const productRepository = new ProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);
    try {
        const input = {
            name: req.body.name,
            price: req.body.price
        }
        const output = await createProductUseCase.execute(input);
        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});

productRoute.get("/", async (req: Request, res: Response) => {
    const productRepository = new ProductRepository();
    const listProductUseCase = new ListProductUseCase(productRepository);
    try {
        const output = await listProductUseCase.execute({});
        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }

});