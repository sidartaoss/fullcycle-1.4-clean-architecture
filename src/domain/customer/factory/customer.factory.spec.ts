import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit tests.", () => {

    it("should create a customer", () => {

        const customer = CustomerFactory.create("Customer 1");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Customer 1");
        expect(customer.address).toBeUndefined();

    });

    it("should create a customer with an address", () => {
        const address = new Address("Rua ABC", 93, "93000333", "Caxias do Sul");
        const customer = CustomerFactory.createWithAddress("Customer 1", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Customer 1");
        expect(customer.address).toBe(address);
    });

})