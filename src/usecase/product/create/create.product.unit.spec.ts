import CreateProductUseCase from "./create.product.usecase";

const input = {
    name: "Product 1",
    price: 29.9
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Create product use case unit tests", () => {

    it("should create a product", async () => {

        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        const output = await createProductUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    });

    it("should throw an error when name is missing", async () => {

        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        input.name = "";

        await expect(createProductUseCase.execute(input))
            .rejects
            .toThrow("Name is required.")

    })

    it("should throw an error when price equal to zero", async () => {

        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        input.name = "Product 1";
        input.price = 0.0;

        await expect(createProductUseCase.execute(input))
            .rejects
            .toThrow("Price must be greater than zero.")

    })

    it("should throw an error when price lower than zero", async () => {

        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        input.price = -1.99;

        await expect(createProductUseCase.execute(input))
            .rejects
            .toThrow("Price must be greater than zero.")

    })

})