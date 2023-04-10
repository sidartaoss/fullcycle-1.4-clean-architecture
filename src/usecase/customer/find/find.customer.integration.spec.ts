import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Find customer use case integration tests", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();

    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a customer", async () => {

        const customerRepository = new CustomerRepository();
        const useCase = new FindCustomerUseCase(customerRepository);

        const customer = new Customer("123", "Customer 1");
        const address = new Address("Rua ABC", 99, "90999699", "Caxias do Sul");
        customer.changeAddress(address);
        const customerCreated = await customerRepository.create(customer);

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

})