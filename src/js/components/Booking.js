import { select, templates, settings, utils } from '../settings.js';
import AmountWidget from './AmountWidget.js';
import DatePicker from './DatePicker.js';
import HoursPicker from './HourPicker.js';

class Booking {
  constructor(bookingWidget) {
    const thisBooking = this;
    thisBooking.render(bookingWidget);
    thisBooking.initWidgets();
    thisBooking.getData();
  }
  render(element) {
    const thisBooking = this;
    const generatedHTML = templates.bookingWidget();
    thisBooking.dom = {};
    thisBooking.dom.wrapper = element;
    thisBooking.dom.wrapper.innerHTML = generatedHTML;
    thisBooking.dom.peopleAmount = thisBooking.dom.wrapper.querySelector(select.booking.peopleAmount);
    thisBooking.dom.hoursAmount = thisBooking.dom.wrapper.querySelector(select.booking.hoursAmount);
    thisBooking.dom.datePicker = thisBooking.dom.wrapper.querySelector(select.widgets.datePicker.wrapper);
    thisBooking.dom.hoursPicker = thisBooking.dom.wrapper.querySelector(select.widgets.hourPicker.wrapper);
  }
  initWidgets() {
    const thisBooking = this;
    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);
    thisBooking.datePicker = new DatePicker(thisBooking.dom.datePicker);
    thisBooking.hoursPicker = new HoursPicker(thisBooking.dom.hoursPicker);
  }
  getData() {
    thisBooking = this;
    const startDateParam = settings.db.dateStartParamKey + '=' + utils.dateToStr(thisBooking.datePicker.minDate);
    const endDateParam = settings.db.dateEndParamKey + '=' + utils.dateToStr(thisBooking.datePicker.maxDate);
    const params = {
      booking: [
        startDateParam ,
        endDateParam
      ],
      eventsCurrent: [
        settings.db.notRepeatParam,
        startDateParam,
        endDateParam
      ],
      eventsRepeat: [
        settings.db.repeatParam,
        endDateParam
      ]
    }
    const urls = {
      booking: settings.db.url + '/' + settings.db.booking + '?' + params.booking.join('&'),
      eventsCurrent: settings.db.url + '/' + settings.db.event + '?' + params.eventsCurrent.join('&'),
      eventsRepeat: settings.db.url + '/' + settings.db.event + '?' + params.ventsRepeat.join('&'),
    };
    Promise.all([
      fetch(urls.booking),
    ])
fetch(urls.booking)
fetch(urls.eventsCurrent)
fetch(urls.eventsRepeat)
.then(function(allResponses){
  const bookingsResponse = allResponses[0];
  const eventsCurrentResponse = allResponses[1];
  const eventsRepeatResponse = allResponses[2];
return Promise.all ([
bookingsResponse.json(),
eventCurrentResponse.json(),
eventRepeatResponse.json(),
]);
  })
  .then (function([bookings, eventsCurrentResponse, eventsRepeatResponse]){
    console.log(bookings);
    console.log(eventsCurrentResponse);
    console.log(eventsRepeatResponse);
  });
}
export default Booking;