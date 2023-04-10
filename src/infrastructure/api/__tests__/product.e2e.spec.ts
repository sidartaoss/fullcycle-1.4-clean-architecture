import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E tests for product", () => {

    beforeEach(async () => {
        await sequelize.sync({force: true});
    })
    afterAll(async () => {
        await sequelize.close();
    })

    it("should create a product", async () => {

        const response = await request(app)
                .post("/product")
                .send({
                    name: "Product 1",
                    price: 39.9
                })

        expect(response.status).toBe(200);

        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe("Product 1");
        expect(response.body.price).toBe(39.9);
    });

    it("should list all products", async () => {
        const response = await request(app)
        .post("/product")
        .send({
            name: "Product 1",
            price: 39.9
        })

        expect(response.status).toBe(200);

        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe("Product 1");
        expect(response.body.price).toBe(39.9);

        const response2 = await request(app)
                .post("/product")
                .send({
                    name: "Product 2",
                    price: 49.9
                })

        expect(response2.status).toBe(200);

        expect(response2.body.id).toBeDefined();
        expect(response2.body.name).toBe("Product 2");
        expect(response2.body.price).toBe(49.9);

        const listResponse = await request(app)
            .get("/product")
            .send();

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);

        const product1 = listResponse.body.products[0];
        expect(product1.id).toBeDefined();
        expect(product1.name).toBe("Product 1");
        expect(product1.price).toBe(39.9);

        const product2 = listResponse.body.products[1];
        expect(product2.id).toBeDefined();
        expect(product2.name).toBe("Product 2");
        expect(product2.price).toBe(49.9);
    })

})