import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";
import ListProductUseCase from "./list.product.usecase";


describe("List product use case integration tests", () => {

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

    it("should list product 1 and product 2", async () => {

        const productRepository = new ProductRepository();

        const createProductUseCase = new CreateProductUseCase(productRepository);

        const createProduct1Input = {
            name: "Product 1",
            price: 19.9
        }

        const outputCreateProduct1UseCase = await createProductUseCase.execute(createProduct1Input);

        expect(outputCreateProduct1UseCase).toEqual({
            id: expect.any(String),
            name: createProduct1Input.name,
            price: createProduct1Input.price
        });

        const createProduct2Input = {
            name: "Product 2",
            price: 39.9
        }

        const outputCreateProduct2UseCase = await createProductUseCase.execute(createProduct2Input);

        expect(outputCreateProduct2UseCase).toEqual({
            id: expect.any(String),
            name: createProduct2Input.name,
            price: createProduct2Input.price
        });

        const listProductUseCase = new ListProductUseCase(productRepository);

        const output = await listProductUseCase.execute({});

        expect(output.products.length).toBe(2);

        expect(output.products[0].id).toBe(outputCreateProduct1UseCase.id);
        expect(output.products[0].name).toBe(outputCreateProduct1UseCase.name);
        expect(output.products[0].price).toBe(outputCreateProduct1UseCase.price);

        expect(output.products[1].id).toBe(outputCreateProduct2UseCase.id);
        expect(output.products[1].name).toBe(outputCreateProduct2UseCase.name);
        expect(output.products[1].price).toBe(outputCreateProduct2UseCase.price);
    });

});