import CustomerCreatedEvent from "../customer.created.event";
import SendConsoleLogHandler2 from "./send-consolelog-handler2.handler";

describe("SendConsoleLogHandler2 tests", () => {
  it("should show message", () => {
    const event = new CustomerCreatedEvent({});
    const eventHandler = new SendConsoleLogHandler2();
    const spyConsoleLog = jest.spyOn(globalThis.console, "log");

    eventHandler.handle(event);
    expect(spyConsoleLog).toBeCalledWith(
      "Esse é o segundo console.log do evento: CustomerCreated"
    );
  });
});
