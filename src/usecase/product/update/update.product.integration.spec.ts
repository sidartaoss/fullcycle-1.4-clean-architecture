import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";
import UpdateProductUseCase from "./update.product.usecase";

describe("Update product use case integration tests", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();

    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should update a product", async () => {

        const productRepository = new ProductRepository();

        const createProductUseCase = new CreateProductUseCase(productRepository);

        const createProductInput = {
            name: "Product 1",
            price: 19.9
        }

        const outputCreateProductUseCase = await createProductUseCase.execute(createProductInput);

        expect(outputCreateProductUseCase).toEqual({
            id: expect.any(String),
            name: createProductInput.name,
            price: createProductInput.price
        });

        const updateProductUseCase = new UpdateProductUseCase(productRepository);

        const updateProductInput = {
            id: outputCreateProductUseCase.id,
            name: "Product Updated",
            price: 49.9
        }

        const output = await updateProductUseCase.execute(updateProductInput);

        expect(output).toEqual(updateProductInput);

    });

    it("should throw an error when name is missing", async () => {
        const productRepository = new ProductRepository();

        const createProductUseCase = new CreateProductUseCase(productRepository);

        const createProductInput = {
            name: "Product 1",
            price: 19.9
        }

        const outputCreateProductUseCase = await createProductUseCase.execute(createProductInput);

        expect(outputCreateProductUseCase).toEqual({
            id: expect.any(String),
            name: createProductInput.name,
            price: createProductInput.price
        });

        const updateProductUseCase = new UpdateProductUseCase(productRepository);

        const updateProductInput = {
            id: outputCreateProductUseCase.id,
            name: "",
            price: 49.9
        }

        await expect(updateProductUseCase.execute(updateProductInput))
            .rejects
            .toThrow("product: Name is required.");

    })

    it("should throw an error when price is equal to zero", async () => {
        const productRepository = new ProductRepository();

        const createProductUseCase = new CreateProductUseCase(productRepository);

        const createProductInput = {
            name: "Product 1",
            price: 19.9
        }

        const outputCreateProductUseCase = await createProductUseCase.execute(createProductInput);

        expect(outputCreateProductUseCase).toEqual({
            id: expect.any(String),
            name: createProductInput.name,
            price: createProductInput.price
        });

        const updateProductUseCase = new UpdateProductUseCase(productRepository);

        const updateProductInput = {
            id: outputCreateProductUseCase.id,
            name: "Product Updated",
            price: 0.0
        }

        await expect(updateProductUseCase.execute(updateProductInput))
            .rejects
            .toThrow("product: Price must be greater than zero.");

    })

    it("should throw an error when price is lower than zero", async () => {
        const productRepository = new ProductRepository();

        const createProductUseCase = new CreateProductUseCase(productRepository);

        const createProductInput = {
            name: "Product 1",
            price: 19.9
        }

        const outputCreateProductUseCase = await createProductUseCase.execute(createProductInput);

        expect(outputCreateProductUseCase).toEqual({
            id: expect.any(String),
            name: createProductInput.name,
            price: createProductInput.price
        });
    
        const updateProductUseCase = new UpdateProductUseCase(productRepository);

        const updateProductInput = {
            id: outputCreateProductUseCase.id,
            name: "Product Updated",
            price: -1.99
        }

        await expect(updateProductUseCase.execute(updateProductInput))
            .rejects
            .toThrow("product: Price must be greater than zero.");

    })

});