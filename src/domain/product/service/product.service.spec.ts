
import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product service unit tests", () => {

    it("should change the prices of all products", () => {

        const product1 = new Product("p1", "Product 1", 69.99);
        const product2 = new Product("p2", "Product 2", 79.99);
        const product3 = new Product("p3", "Product 3", 89.99);
        const products = [product1, product2, product3];

        ProductService.increasePrice(products, 1.2);

        expect(product1.price).toBe(83.98799999999999);
        expect(product2.price).toBe(95.98799999999999);
        expect(product3.price).toBe(107.98799999999999);
    });

})