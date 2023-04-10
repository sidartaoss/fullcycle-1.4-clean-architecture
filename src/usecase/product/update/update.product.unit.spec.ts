import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create(
    "a",
    "Product 1",
    29.9
);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
};

describe("Update product use case unit tests", () => {

    it("should update a product", async () => {

        const productRepository = MockRepository();
        const updateProductUseCase = new UpdateProductUseCase(productRepository);

        const input = {
            id: product.id,
            name: "Product Updated",
            price: 49.9
        }

        const output = await updateProductUseCase.execute(input);

        expect(output).toEqual(input);

    });

    it("should throw an error when price is equal to zero", async () => {
        const productRepository = MockRepository();
        const updateProductUseCase = new UpdateProductUseCase(productRepository);

        const input = {
            id: product.id,
            name: "Product Updated",
            price: 0.0
        }

        await expect(updateProductUseCase.execute(input))
            .rejects
            .toThrow("product: Price must be greater than zero.");

    });

    it("should throw an error when price is lower than zero", async () => {
        const productRepository = MockRepository();
        const updateProductUseCase = new UpdateProductUseCase(productRepository);

        const input = {
            id: product.id,
            name: "Product Updated",
            price: -1.99
        }

        await expect(updateProductUseCase.execute(input))
            .rejects
            .toThrow("product: Price must be greater than zero.");

    });

    it("should throw an error when name is missing", async () => {
        const productRepository = MockRepository();
        const updateProductUseCase = new UpdateProductUseCase(productRepository);

        const input = {
            id: product.id,
            name: "",
            price: 49.9
        }

        await expect(updateProductUseCase.execute(input))
            .rejects
            .toThrow("product: Name is required.");

    });

});