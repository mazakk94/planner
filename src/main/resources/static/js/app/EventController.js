'use strict';

angular.module('crudApp').controller('EventController',
  ['EventService', '$scope', 'CalendarService' , function( EventService, $scope, CalendarService) {
		
    var self = this;
    self.event = {};
    self.events = [];

    self.init = init;
    self.submit = submit;
    self.getAllEvents = getAllEvents;
    self.createEvent = createEvent;
    self.updateEvent = updateEvent;
    self.removeEvent = removeEvent;
    self.editEvent = editEvent;
    self.reset = reset;

    self.successMessage = '';
    self.errorMessage = '';
    self.done = false;

    self.onlyIntegers = /^\d+$/;
    self.onlyNumbers = /^\d+([,.]\d+)?$/;
    init();

    function init() {

      console.log('gonna start here');
      Promise.resolve(EventService.loadAllRooms())
        .then(function(rooms){ promiseRooms(rooms)
          .then(function(array){ promiseCalendarLoad(array) });
        });     
    }

    function promiseRooms(rooms) {
      console.log('gonna continue there');
      return new Promise(function(resolve, reject) {
        console.log(rooms);
        Promise.resolve(EventService.loadAllEvents()).then (function(events) {resolve(([events, rooms]))});  
      });
    }

    function promiseCalendarLoad(array) {
      var events = array[0];     
      var rooms = array[1];     
      Promise.resolve(CalendarService.loadCalendar(events, rooms))
      .then(function(events) {
        console.log('trying to refresh...: ' + events);
        CalendarService.refreshCalendar(events);
      });
      console.log(array);
    }

    function submit() {
      console.log('Submitting');
      if (self.event.id === undefined || self.event.id === null) {
        console.log('Saving New Event', self.event);
        createEvent(self.event);
      } else {
        updateEvent(self.event, self.event.id);
        console.log('Event updated with id ', self.event.id);
      }
    }

    function createEvent(event) { //only service function is called from calendar
      console.log('About to create event');
      EventService.createEvent(event)
        .then(
          function (response) {
            
            Promise.resolve(EventService.loadAllEvents()).then (
              function(events) {
                CalendarService.refreshCalendar();
              });  

            // CalendarService.refreshCalendar();
            console.log('Event created successfully');
            $scope.myForm.$setPristine();
          },
          function (errResponse) {
            console.error('Error while creating Event');
            self.errorMessage = 'Error while creating Event: ' + errResponse.data.errorMessage;
            self.successMessage='';
          }
        );
    }

    function updateEvent(event, id){
      console.log('About to update event');
      EventService.updateEvent(event, id)
        .then(
          function (response){
            console.log('Event updated successfully');
            self.successMessage='Event updated successfully';
            self.errorMessage='';
            self.done = true;
            $scope.myForm.$setPristine();
          },
          function(errResponse){
            console.error('Error while updating Event');
            self.errorMessage='Error while updating Event '+errResponse.data;
            self.successMessage='';
          }
        );
    }

    function removeEvent(id){
      console.log('About to remove Event with id '+id);
      EventService.removeEvent(id)
        .then(
          function(responseEvents){
            var events = [];
            events = EventService.prepareEvents(responseEvents);            
            CalendarService.refreshCalendar(events);
            console.log('Event '+id + ' removed successfully');
          },
          function(errResponse){
            console.error('Error while removing event '+id +', Error :'+errResponse.data);
          }
        );
    }

    function getAllEvents(){
      self.events = EventService.getAllEvents();
      return self.events;
    }

    function editEvent(id) {
      self.successMessage='';
      self.errorMessage='';
      EventService.getEvent(id).then(
        function (event) {
          self.event = event;
        },
        function (errResponse) {
          console.error('Error while removing event ' + id + ', Error :' + errResponse.data);
        }
      );
    }
    function reset(){
      self.successMessage='';
      self.errorMessage='';
      self.event={};
      $scope.myForm.$setPristine(); //reset Form
    }
  }


  ]);