import CustomerCreatedEvent from "../customer.created.event";
import SendConsoleLogHandler1 from "./send-consolelog-handler1.handler";

describe("SendConsoleLogHandler1 tests", () => {
  it("should show message", () => {
    const event = new CustomerCreatedEvent({});
    const eventHandler = new SendConsoleLogHandler1();
    const spyConsoleLog = jest.spyOn(globalThis.console, "log");

    eventHandler.handle(event);
    expect(spyConsoleLog).toBeCalledWith(
      "Esse é o primeiro console.log do evento: CustomerCreated"
    );
  });
});
