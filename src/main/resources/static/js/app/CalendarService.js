'use strict';

angular.module('crudApp').factory('CalendarService', 
['$localStorage', '$http', '$q', 'urls', 'EventService',
  function ($localStorage, $http, $q, urls, EventService) {
      // function () {

    var factory = {
      foo: foo,
      revert: revert,
      loadCalendar: loadCalendar,
      fullRefresh: fullRefresh,
      refreshCalendar: refreshCalendar
    };

    return factory;

    function foo() {
      alert("I'm foo!");
    }

    function revert(revertFunc) {
      revertFunc();
    }

    function loadCalendar(localStorageEvents, localStorageRooms) {
      $('#calendar').fullCalendar({
        schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
        defaultView: 'agendaDay',
        minTime: '08:00:00',
        maxTime: '18:00:00',
        slotDuration: '00:15:00',
        allDaySlot: false,
        eventResizeStop: function( event, jsEvent, ui, view ) {   
          var diffMs = null;
          var diffMins = null;
          if (event.end !== undefined && event.end !== null && event.start !== undefined && event.start !== null) {
            diffMs = (event.end.time() - event.start.time());
            diffMins = Math.round((diffMs % 86400000) / 60000); // minutes
          }
        },
        eventSources: [
          {
            events : localStorageEvents,
            color: '#3399ff',
            editable: true
          },
        ],  
        eventOverlap: false,
        eventResize: function( event, delta, revertFunc, jsEvent, ui, view ) {
          event.id = EventService.getEventIdFromSelect(event._id);
          var diffMs = null;
          if (event.end !== undefined && event.end !== null && event.start !== undefined && event.start !== null) {
            var diffMs = (event.end.time() - event.start.time()) / 60000;
          }                         

          if (diffMs !== null && diffMs > 120) {
            if (confirm("is 120 okay rather than " + diffMs + "?")) {
              event.end = moment(new Date(event.start + (120 * 60000)));
              event.rendering = 'background';
              EventService.createOrUpdateEvent(event);
              return;
            } else {
              // callRevert(revertFunc);
              revertFunc();
            }
          } else if (diffMs !== null) {
            EventService.createOrUpdateEvent(event);
          }
          
          if (event.end !== undefined && event.end !== null && event.start !== undefined && event.start !== null) {
            var millisDuration = event.end.time() - event.start.time();            
            var minutesDuration = Math.round((millisDuration % 86400000) / 60000); // minutes
            if (minutesDuration > 120) {
              revertFunc();
            }
          }
        },
        eventDrop: function( event, delta, revertFunc, jsEvent, ui, view ) {
          EventService.createOrUpdateEvent(event);
        },
        dayClick: function(date, jsEvent, view, resourceObj) {   
          date.format();
          var prawda = false;
        },

        eventClick: function(calEvent, jsEvent, view) {
          //TODO
          var event = {};
          event.title = 'item.name';
          event.start = view.start.time();
          event.end = view.end.time();
          event.resourceId = calEvent.resourceId;
          
          $('#calendar').fullCalendar( 'addEventSource', event );
          var array = [];
          array = $('#calendar').fullCalendar( 'clientEvents' );            
          var prawda = false;
        },            
        resources: localStorageRooms,

        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
        editable: true,
        eventLimit: true,
        defaultView: 'agendaDay',
        selectable: true,
        selectHelper: true,

        select: function(start, end, jsEvent, view, resource ) {  
          var title = "test";
          var event = { title: title, start: start, end: end, resourceId: resource.id };

          if (title) {
            $('#calendar').fullCalendar('renderEvent', event, true);              
            Promise.resolve(EventService.createEvent(event)).then (
              function(event) {
                fullRefresh();
              });
          }
        }
      });
      return localStorageEvents;
    }

    function fullRefresh() {
      Promise.resolve(EventService.loadAllEvents())
      .then(function(events) {
        console.log('trying to refresh...: ' + events);
        refreshCalendar(events);
      });
    }

    function refreshCalendar(localStorageEvents) {
      var events = localStorageEvents;
      if (events === undefined) {
        fullRefresh();
      } else {
        $('#calendar').fullCalendar( 'removeEvents');
        $('#calendar').fullCalendar( 'addEventSource', events); 
        $('#calendar').fullCalendar( 'rerenderEvents'); 
      }
    }

  }
]);