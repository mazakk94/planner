'use strict';

angular.module('crudApp').factory('CalendarService', 
['$localStorage', '$http', '$q', 'urls', 'EventService',
  function ($localStorage, $http, $q, urls, EventService) {
      // function () {

    return {

      foo: function() {
          alert("I'm foo!");
      },

      revert: function(revertFunc){
        revertFunc();
      },

      // /*
      loadCalendar: function(localStorageEvents, localStorageRooms) {
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
          eventLimit: true, // allow "more" link when too many events
          defaultView: 'agendaDay',
          selectable: true, //permite sa selectezi mai multe zile
          selectHelper: true, //coloreaza selctia ta

          select: function(start, end, jsEvent, view, resource ) {          
            // select: function(start, end, allDay) {            
            var title = "test";
            var event = { title: title, start: start, end: end, resourceId: resource.id };
            if (title) {
              $('#calendar').fullCalendar('renderEvent', event, true);              
              Promise.resolve(EventService.createEvent(event)).then (
                function(events) {
                  refreshCalendar(); //TODO
                });
            }

            //TODO check if necessary below
            $('#calendar').fullCalendar('unselect');
            var array = [];
            array = $('#calendar').fullCalendar( 'clientEvents' );  
            $('#calendar').fullCalendar( 'refetchEventSources', array );
            // updateAllEvents();
          }
        });
        return localStorageEvents;
      },
      // */

      // function refreshCalendar() {
      //   var array = $('#calendar').fullCalendar( 'clientEvents' );
      //   var events = localStorageEvents;
      //   $('#calendar').fullCalendar( 'removeEvents');
      //   $('#calendar').fullCalendar( 'addEventSource', events); 
      //   $('#calendar').fullCalendar( 'rerenderEvents');        
      // },

      refreshCalendar: function(localStorageEvents) {
        var array = $('#calendar').fullCalendar( 'clientEvents' );
        var events = localStorageEvents;
        $('#calendar').fullCalendar( 'removeEvents');
        $('#calendar').fullCalendar( 'addEventSource', events); 
        $('#calendar').fullCalendar( 'rerenderEvents');        
      }

    };
    
  // });
  }
]
);