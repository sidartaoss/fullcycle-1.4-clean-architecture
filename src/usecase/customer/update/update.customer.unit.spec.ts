import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
    "Customer 1",
    new Address("Rua ABC", 99, "99000633", "Caxias do Sul")
);

const input = {
    id: customer.id,
    name: "Customer Updated",
    address: {
        street: "Rua Updated",
        number: 699,
        zip: "99111999",
        city: "Novo Hamburgo"
    }
};

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Customer update use case unit tests", () => {

    it("should update a customer", async () => {
        const customerRepository = MockRepository();
        const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

        const output = await updateCustomerUseCase.execute(input);

        expect(output).toEqual(input);
    })

});