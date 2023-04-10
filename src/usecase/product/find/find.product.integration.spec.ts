import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";
import FindProductUseCase from "./find.product.usecase";

describe("Find product use case integration tests", () => {

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

    it("should find a product", async () => {

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
        
        const findProductUseCase = new FindProductUseCase(productRepository);

        const input = {
            id: outputCreateProductUseCase.id
        }

        const output = {
            id: outputCreateProductUseCase.id,
            name: "Product 1",
            price: 19.9
        }

        const result = await findProductUseCase.execute(input);

        expect(result).toEqual(output);

    });

    it("should throw an error when a product is not found", async () => {

        const productRepository = new ProductRepository();

        const findProductUseCase = new FindProductUseCase(productRepository);

        const input = {
            id: "123"
        };

        expect(() => {
            return findProductUseCase.execute(input);
        }).rejects.toThrow("Product not found.");
    });

});