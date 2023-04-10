import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
    "Customer 1",
    new Address(
        "Rua ABC",
        99,
        "90111222",
        "Caxias do Sul"
    )
);

const customer2 = CustomerFactory.createWithAddress(
    "Customer 2",
    new Address(
        "Rua EFG",
        33,
        "91222333",
        "Osorio"
    )
);

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("List customers use case unit tests", () => {

    it("should list customer 1 and customer 2", async () => {
        const customerRepository = MockRepository();
        const listCustomerUseCase = new ListCustomerUseCase(customerRepository);

        const output = await listCustomerUseCase.execute({});

        expect(output.customers.length).toBe(2);

        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.address.street);

        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.address.street);
    });

})