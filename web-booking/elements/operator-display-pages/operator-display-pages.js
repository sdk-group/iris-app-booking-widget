'use strict';

Polymer({
  is: 'operator-display-pages',
  ready: function ready() {
    this.selected = 0;
  },
  placeExternalContent: function placeExternalContent(e) {
    var detail = e.detail;
    Polymer.dom(this.$.holder).innerHTML = detail;
  },
  placeBackdropContent: function placeBackdropContent(e) {
    var detail = e.detail;
    Polymer.dom(this.$.backdrop).innerHTML = detail;
  },
  blinkTicket: function blinkTicket(e) {
    this.ticket = e.detail;
    this.ticketClass = 'blink';
    this.set('selected', 1);
  },
  showTicket: function showTicket(e) {
    this.ticket = e.detail;
    this.ticketClass = 'show';
    this.set('selected', 1);
  },
  hideTicket: function hideTicket(e) {
    this.ticketClass = 'hide';
    this.set('selected', 0);
  }
});