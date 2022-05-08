import EventInterface from "../../@shared/event/event.interface";

type customerCreatedEventData = {};

export default class CustomerCreatedEvent implements EventInterface {
  dateTimeOcurred: Date;
  eventData: customerCreatedEventData;

  constructor(eventData: customerCreatedEventData) {
    this.dateTimeOcurred = new Date();
    this.eventData = eventData;
  }
}
