import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("123", "Product 1", 19.9);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    };
};

describe("Find product use case unit tests", () => {

    it("should find a product", async () => {

        const productRepository = MockRepository();
        const findProductUseCase = new FindProductUseCase(productRepository);

        const input = {
            id: "123"
        }

        const output = {
            id: "123",
            name: "Product 1",
            price: 19.9
        }

        const result = await findProductUseCase.execute(input);

        expect(result).toEqual(output);

    });

    it("should throw an error when a product is not found", async () => {

        const productRepository = MockRepository();
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found.");
        });

        const findProductUseCase = new FindProductUseCase(productRepository);

        const input = {
            id: "123"
        };

        expect(() => {
            return findProductUseCase.execute(input);
        }).rejects.toThrow("Product not found.");
    });

});