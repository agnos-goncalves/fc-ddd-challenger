import EventInterface from "../../@shared/event/event.interface";

type customerAddressChangedEventData = {
  id: string;
  name: string;
  address: string;
};

export default class CustomerAddressChangedEvent implements EventInterface {
  dateTimeOcurred: Date;
  eventData: customerAddressChangedEventData;

  constructor(eventData: customerAddressChangedEventData) {
    this.dateTimeOcurred = new Date();
    this.eventData = eventData;
  }
}
