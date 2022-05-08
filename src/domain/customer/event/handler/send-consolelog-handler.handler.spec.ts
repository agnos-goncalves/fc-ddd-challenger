import CustomerAddressChangedEvent from "../customer.address.changed.event";
import SendConsoleLogHandler from "./send-consolelog-handler.handler";

describe("SendConsoleLogHandler tests", () => {
  it("should show message", () => {
    const event = new CustomerAddressChangedEvent({
      id: "1",
      name: "Endereco 1",
      address: "Rua Teste de Almeida",
    });
    const eventHandler = new SendConsoleLogHandler();
    const spyConsoleLog = jest.spyOn(globalThis.console, "log");

    eventHandler.handle(event);
    expect(spyConsoleLog).toBeCalledWith(
      "Endereço do cliente: 1, Endereco 1 alterado para: Rua Teste de Almeida"
    );
  });
});
