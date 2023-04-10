import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {

    it("should place an order", () => {

        const customer = new Customer("c1", "Customer 1");
        const item1 = new OrderItem("o1", "Item 1", 699.99, "p1", 1);

        const order = OrderService.placeOrder(customer, [ item1 ]);

        expect(customer.rewardPoints).toBe(349.995);
        expect(order.total()).toBe(699.99);

    });

    it("should get total of all orders", () => {

        const item1 = new OrderItem("i1", "Item 1", 39.99, "p1", 1);
        const item2 = new OrderItem("i2", "Item 2", 49.99, "p2", 1);
        const item3 = new OrderItem("i3", "Item 3", 59.99, "p3", 1);

        const order1 = new Order("o1", "c1", [ item1 ]);
        const order2 = new Order("o2", "c1", [ item2 ]);
        const order3 = new Order("o3", "c1", [ item3 ]);

        const total = OrderService.total([order1, order2, order3]);

        expect(total).toBe(149.97);
    });

});