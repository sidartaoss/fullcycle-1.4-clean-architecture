import { Sequelize } from "sequelize-typescript";
import Product from "../../../../domain/product/entity/product";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";

describe("Product repository tests.", () => {

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

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 199.99);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "1",  } });
        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 199.99
        });
    });

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 169.99);
        
        await productRepository.create(product);

        const productModel = await ProductModel.findOne( { where: { id: "1" } });
        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 169.99
        });

        product.changeName("Product 2");
        product.changePrice(199.99);

        await productRepository.update(product);

        const productModel2 = await ProductModel.findOne( { where: { id: "1" } });
        expect(productModel2.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 2",
            price: 199.99
        });

    });

    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 199.99);

        await productRepository.create(product);

        const foundProduct = await productRepository.find("1");
    
        expect(foundProduct.id).toBe(product.id);
        expect(foundProduct.name).toBe(product.name);
        expect(foundProduct.price).toBe(product.price);

    });

    it("should find all products", async () => {
        const productRepository = new ProductRepository();
        const product1: Product = new Product("1", "Product 1", 199.99);
        const product2: Product = new Product("2", "Product 2", 169.99);

        const products = [ product1, product2 ];

        await productRepository.create(product1);
        await productRepository.create(product2);

        const foundProducts: Product[] = await productRepository.findAll();

        expect(products).toEqual(foundProducts)

    });

    it("should throw an error when product is not found", async () => {
        const productRepository = new ProductRepository();
        expect(async () => {
            await productRepository.find("456ABC");
        }).rejects.toThrow("Product not found.");
    });

});