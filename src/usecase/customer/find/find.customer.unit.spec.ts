import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "Customer 1");
const address = new Address("Rua ABC", 99, "90999699", "Caxias do Sul");
customer.changeAddress(address);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Find customer use case unit tests", () => {

    it("should find a customer", async () => {

        const customerRepository = MockRepository();
        const useCase = new FindCustomerUseCase(customerRepository);

        const input = {
            id: "123"
        }

        const output = {
            id: "123",
            name: "Customer 1",
            address: {
                street: "Rua ABC",
                city: "Caxias do Sul",
                number: 99,
                zip: "90999699"
            }
        }

        const result = await useCase.execute(input);

        expect(result).toEqual(output);

    })

    it("should not find a customer", async () => {

        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found.");
            
        });

        const useCase = new FindCustomerUseCase(customerRepository);
        
        const input = {
            id: "123"
        }

        expect(() => {
            return useCase.execute(input);
        })
            .rejects.toThrow("Customer not found.");
    })

})