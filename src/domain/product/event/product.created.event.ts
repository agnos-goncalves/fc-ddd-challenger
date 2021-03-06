import EventInterface from "../../@shared/event/event.interface";

type productCreatedEventData = {
  name: string;
  description: string;
  price: number;
};

export default class ProductCreatedEvent implements EventInterface {
  dateTimeOcurred: Date;
  eventData: productCreatedEventData;

  constructor(eventData: productCreatedEventData) {
    this.dateTimeOcurred = new Date();
    this.eventData = eventData;
  }
}
