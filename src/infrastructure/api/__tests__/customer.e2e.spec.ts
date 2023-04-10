import { app, sequelize } from "../express"
import request from "supertest";

describe("E2E tests for customer", () => {

    beforeEach(async () => {
        await sequelize.sync({force: true});

    });
    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const response = await request(app)
                .post("/customer")
                .send({
                    name: "Customer 1",
                    address: {
                        street: "Rua ABC",
                        number: 99,
                        zip: "90333000",
                        city: "Caxias do Sul"
                    }
                });

        expect(response.status).toBe(200);

        expect(response.body.name).toBe("Customer 1");
        expect(response.body.address.street).toBe("Rua ABC");
        expect(response.body.address.number).toBe(99);
        expect(response.body.address.zip).toBe("90333000");
        expect(response.body.address.city).toBe("Caxias do Sul");
    });

    it("should throw an error when trying to create a customer", async () => {

        const response = await request(app)
            .post("/customer")
            .send({
                name: "Customer 1"
            });

        expect(response.status).toBe(500);

    });

    it("should list all customers", async () => {
        const response = await request(app)
                .post("/customer")
                .send({
                    name: "Customer 1",
                    address: {
                        street: "Rua ABC",
                        number: 99,
                        zip: "90333000",
                        city: "Caxias do Sul"
                    }
                });

        expect(response.status).toBe(200);

        const response2 = await request(app)
            .post("/customer")
            .send({
                name: "Customer 2",
                address: {
                    street: "Rua DEF",
                    number: 33,
                    zip: "99000333",
                    city: "Novo Hamburgo"
                }
            });

        expect(response2.status).toBe(200);

        const listResponse = await request(app)
            .get("/customer")
            .send();
        
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);
        
        const customer1 = listResponse.body.customers[0];
        expect(customer1.name).toBe("Customer 1");
        expect(customer1.address.street).toBe("Rua ABC");
        expect(customer1.address.number).toBe(99);
        expect(customer1.address.zip).toBe("90333000");
        expect(customer1.address.city).toBe("Caxias do Sul");

        const customer2 = listResponse.body.customers[1];
        expect(customer2.name).toBe("Customer 2");
        expect(customer2.address.street).toBe("Rua DEF");
        expect(customer2.address.number).toBe(33);
        expect(customer2.address.zip).toBe("99000333");
        expect(customer2.address.city).toBe("Novo Hamburgo");
    });

});