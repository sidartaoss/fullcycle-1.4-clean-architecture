import { Sequelize } from "sequelize-typescript";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "./customer.model";
import CustomerRepository from "./customer.repository";

describe("Customer repository tests.", () => {

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

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Rua Primerio de Maio", 110, "93520620", "Novo Hamburgo");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1",  } });
        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: customer.address.street,
            number: customer.address.number,
            zipCode: customer.address.zip,
            city: customer.address.city
        });
    });

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Rua Primerio de Maio", 110, "93520620", "Novo Hamburgo");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        customer.changeName("Customer 2");
        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findOne( { where: { id: "1" } });
        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: customer.address.street,
            number: customer.address.number,
            zipCode: customer.address.zip,
            city: customer.address.city
        });

    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Rua Primerio de Maio", 110, "93520620", "Novo Hamburgo");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const foundCustomer = await customerRepository.find(customer.id);
    
        expect(customer).toStrictEqual(foundCustomer);

    });

    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository();

        const customer1 = new Customer("1", "Customer 1");
        const address1 = new Address("Rua Primerio de Maio", 110, "93520620", "Novo Hamburgo");
        customer1.changeAddress(address1);
        customer1.addRewardPoints(10);
        customer1.activate();


        const customer2 = new Customer("2", "Customer 2");
        const address2 = new Address("Rua Segundo de Maio", 220, "93520622", "Hamburgo");
        customer2.changeAddress(address2);
        customer2.addRewardPoints(20);
        customer2.activate();

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const customers = [ customer1, customer2 ];

        const foundCustomers: Customer[] = await customerRepository.findAll();

        expect(foundCustomers).toHaveLength(2);
        expect(foundCustomers).toContainEqual(customer1);
        expect(foundCustomers).toContainEqual(customer2);

    });

    it("should throw an error when customer is not found", async () => {
        const customerRepository = new CustomerRepository();
        expect(async () => {
            await customerRepository.find("456ABC");
        }).rejects.toThrow("Customer not found.");
    });
});