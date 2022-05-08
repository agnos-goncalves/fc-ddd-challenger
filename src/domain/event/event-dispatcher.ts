import EventDispatcherInterface from "./@shared/event-dispatcher.interface";
import EventHandlerInterface from "./@shared/event-handler.interface";
import eventHandlerInterface from "./@shared/event-handler.interface";
import eventInterface from "./@shared/event.interface";

export default class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: {
    [eventName: string]: EventHandlerInterface[];
  } = {};

  get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
    return this.eventHandlers;
  }

  notify(event: eventInterface): void {
    const eventName = event.constructor.name;
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach((eventHandler) => {
        eventHandler.handle(event);
      });
    }
  }

  register(eventName: string, eventHandler: eventHandlerInterface): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(eventHandler);
  }
  unregister(eventName: string, eventHandler: eventHandlerInterface): void {
    let index = -1;
    if (this.eventHandlers[eventName]) {
      index = this.eventHandlers[eventName].indexOf(eventHandler);
    }
    if (index !== -1) {
      this.eventHandlers[eventName].splice(index, 1);
    }
  }
  unregisterAll(): void {
    this.eventHandlers = {};
  }
}