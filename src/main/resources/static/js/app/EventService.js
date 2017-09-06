'use strict';

angular.module('crudApp').factory('EventService',
  ['$localStorage', '$http', '$q', 'urls',
    function ($localStorage, $http, $q, urls) {

      var factory = {
        loadAllEvents: loadAllEvents,
        loadAllRooms: loadAllRooms,
        getAllEvents: getAllEvents,
        getAllRooms: getAllRooms,
        getEvent: getEvent,
        createEvent: createEvent,
        updateEvent: updateEvent,
        removeEvent: removeEvent
      };

      return factory;

      function loadAllEvents() {
        console.log('Fetching all events');
        var deferred = $q.defer();
        $http.get(urls.EVENT_SERVICE_API)
          .then(
            function (response) {
              console.log('Fetched successfully all events');
              $localStorage.events = prepareEvents(response.data);
              getAllEvents();
              deferred.resolve(response);
            },
            function (errResponse) {
              console.error('Error while loading events');
              deferred.reject(errResponse);
            }
          );
        return deferred.promise;
      }

      function loadAllRooms() {
        console.log('Fetching all rooms');
        var deferred = $q.defer();
        $http.get(urls.ROOM_SERVICE_API)
          .then(
            function (response) {
              console.log('Fetched successfully all rooms');
              $localStorage.rooms = prepareRooms(response.data);
              getAllRooms();
              loadAllEvents();
              deferred.resolve(response);
            },
            function (errResponse) {
              console.error('Error while loading rooms');
              deferred.reject(errResponse);
            }
          );
        return deferred.promise;
      }

      function prepareRooms(data) {
        var result = [];
        for(var i = 0; i < data.length; i++) {
          var item = data[i];
          var room = {};
          room.id = item.id;
          room.title = item.name;
          result.push(room);
        }
         return result;
      }

      function prepareEvents(data) {
        var result = [];
        for(var i = 0; i < data.length; i++) {
          var item = data[i];
          var event = {};
          event.id = item.id;
          event.title = item.name;
          event.start = item.start;
          event.end = item.end;
          event.resourceId = item.room;
          result.push(event);
        }
         return result;
      }

      function getAllRooms(){
        return $localStorage.rooms;
      }

      function getAllEvents(){
        $('#calendar').fullCalendar({
          schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
          defaultView: 'agendaDay',
          // defaultEventMinutes: 45,
          // businessHours: true,
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
            // var diffMs = (event.end.time() - event.start.time());
            var falsz = true;
          },
          eventSources: [
            {
              events : $localStorage.events,
              // events: [
              //   { 
              //     resourceId: 'a',
              //     title  : 'event1',
              //     start  : '2017-09-01'

              //   },
              //   {
              //     resourceId: 'b',
              //     title  : 'event2',
              //     start  : '2017-09-01',
              //     end  : '2017-09-05'
              //   },
              //   {
              //     resourceId: 'c',
              //     title  : 'event3',
              //     start  : '2017-09-01T12:30:00',
              //   }
              // ],

              // dayClick: function() {
              //   alert('a day has been clicked!');
              // },  

              color: '#3399ff',
              // textColor: 'yellow',
              editable: true
            },
          ],

          // eventResize: function(event, delta, revertFunc) {
            
            // // var diffMs = (event.end.time() - event.start.time());
            // var diffMs = null;
            // if (event.end !== undefined && event.end !== null && event.start !== undefined && event.start !== null) {
            //   var diffMs = (event.end.time() - event.start.time()) / 60000;
            // }
            // // var diffMs = (event.end.format() - event.start.format());
            // // alert(event.title + " end is now " + event.end.format());
            // // var endtime = event.end.format();            
            
            // var falsz = true;
                           

            // if (diffMs !== null && diffMs > 120) {
            //   if (confirm("is 120 okay rather than " + diffMs + "?")) {
            //     // event.end = new Date(event.start + 120);
            //     event.end = moment(new Date(event.start + (120 * 60000)));
            //     event.rendering = 'background';
            //     // new Date(tempDate.setHours(tempDate.getHours()+1)); 

            //     // $('#calendar').fullCalendar('updateEvent', event);
                
            //     falsz = true;
            //     // revertFunc();
            //     // $('#calendar').fullCalendar( 'refetchEventSources', eventSources );

            //     updateEvent(event, event.id);
            //     return;
            //     // $('#calendar').fullCalendar( 'rerenderEvents' );
            //     // $('#calendar').fullCalendar( 'refresh');// $localStorage.events );
            //     // $('#calendar').fullCalendar( 'refetchEvents' );
            //     // rerenderEvents();
            //     falsz = true;                
            //   } else {
            //     revertFunc();
            //   }              
            // }

            // if (diffMs !== null) {
            //   updateEvent(event, event.id);            
            // } 
            // // event
          // },

          eventRender: function( event, element, view ) {
            if(event.changing){ // If this event is being changed, grab its render date
              $("#currenttime").html("Start: "+event.start.format("YYYY-MM-DD hh:mma")+"<br> End: "+event.end.format("YYYY-MM-DD hh:mma"));
              // alert('event length: ' + (event.start - event.end).format("YYYY-MM-DD hh:mma"));
            }
          },
          eventResizeStart: function(event, jsEvent, ui, view ){
            // alert('event end: ' + event.end.format("YYYY-MM-DD hh:mma"));
            event.changing = true; // Event is being changed
             
            if (event.end !== undefined && event.end !== null && event.start !== undefined && event.start !== null) {
              var millisDuration = event.end.time() - event.start.time();            
              var minutesDuration = Math.round((millisDuration % 86400000) / 60000); // minutes
              if (minutesDuration > 120) {
                revertFunc();
              }
            }
          
            var falsz = true;
          },
          eventOverlap: false,
          eventResize: function( event, delta, revertFunc, jsEvent, ui, view ) { 

            // var diffMs = (event.end.time() - event.start.time());
            var diffMs = null;
            if (event.end !== undefined && event.end !== null && event.start !== undefined && event.start !== null) {
              var diffMs = (event.end.time() - event.start.time()) / 60000;
            }
            // var diffMs = (event.end.format() - event.start.format());
            // alert(event.title + " end is now " + event.end.format());
            // var endtime = event.end.format();            
            
            var falsz = true;
                          

            if (diffMs !== null && diffMs > 120) {
              if (confirm("is 120 okay rather than " + diffMs + "?")) {
                // event.end = new Date(event.start + 120);
                event.end = moment(new Date(event.start + (120 * 60000)));
                event.rendering = 'background';
                // new Date(tempDate.setHours(tempDate.getHours()+1)); 

                // $('#calendar').fullCalendar('updateEvent', event);
                
                falsz = true;
                // revertFunc();
                // $('#calendar').fullCalendar( 'refetchEventSources', eventSources );

                updateEvent(event, event.id);
                return;
                // $('#calendar').fullCalendar( 'rerenderEvents' );
                // $('#calendar').fullCalendar( 'refresh');// $localStorage.events );
                // $('#calendar').fullCalendar( 'refetchEvents' );
                // rerenderEvents();
                falsz = true;                
              } else {
                revertFunc();
              }              
            }

            if (diffMs !== null) {
              updateEvent(event, event.id);            
            } 
            // event


            event.changing = true; // Event is being changed
            
             if (event.end !== undefined && event.end !== null && event.start !== undefined && event.start !== null) {
               var millisDuration = event.end.time() - event.start.time();            
               var minutesDuration = Math.round((millisDuration % 86400000) / 60000); // minutes
               if (minutesDuration > 120) {
                 revertFunc();
               }
             }
          },
          eventResizeEnd: function(event, jsEvent, ui, view ){
            event.changing = false; // Event is finished being changed
            
            var millisDuration = event.end.time() - event.start.time();            
            var minutesDuration = Math.round((millisDuration % 86400000) / 60000); // minutes
            var falsz = true;
          },
          eventDrop: function( event, delta, revertFunc, jsEvent, ui, view ) {
            updateEvent(event, event.id); 
          },
          // eventDragStart: function(event, jsEvent, ui, view ){
          //   event.changing = true;
          // },
          // eventDragEnd: function(event, jsEvent, ui, view ){
          //   event.changing = false;
          // },

          dayClick: function(date, jsEvent, view, resourceObj) {            
            // alert('Clicked on: ' + date.format());         
            // alert('Clicked on: ' + date.format());
            // alert('Current view: ' + view.name);
            // alert('ROOM: ' + resourceObj.id);

            var prawda = false;
          },

          eventClick: function(calEvent, jsEvent, view) {
            // alert('Event: ' + calEvent.title);
            // alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
            // alert('View: ' + view.name);
            // alert('start: ' + view.start.time());
            // alert('end: ' + view.end.time());
          },            
          resources: $localStorage.rooms
          //  [
          //   { id: 420, title: 'Room 420' },
          //   { id: 44, title: 'Room 44' },
          //   { id: 55, title: 'Room 55' },
          //   { id: 2, title: 'Room 2' },
          //   { id: 34, title: 'Room 34' },
          //   { id: 'd', title: 'Room D' }
          // ]         
        });

        // $('#calendar').fullCalendar( 'refetchEventSources', $localStorage.events );
        // $('#calendar').fullCalendar( 'refresh');// $localStorage.events );
        // $('#calendar').fullCalendar( 'rerenderEvents' );
        // $('#calendar').fullCalendar( 'refetchEvents' );

        // $localStorage.events = $('#calendar').fullCalendar.events;        
        // return $localStorage.events;

        return $localStorage.events;
      }

      function getEvent(id) {
        console.log('Fetching Event with id :'+id);
        var deferred = $q.defer();
        $http.get(urls.EVENT_SERVICE_API + id)
          .then(
            function (response) {
              console.log('Fetched successfully Event with id :'+id);
              deferred.resolve(response.data);
            },
            function (errResponse) {
              console.error('Error while loading event with id :'+id);
              deferred.reject(errResponse);
            }
          );
        return deferred.promise;
      }

      function createEvent(event) {
        console.log('Creating Event');
        var deferred = $q.defer();
        $http.post(urls.EVENT_SERVICE_API, event)
          .then(
            function (response) {
              loadAllEvents();
              deferred.resolve(response.data);
            },
            function (errResponse) {
               console.error('Error while creating Event : '+errResponse.data.errorMessage);
               deferred.reject(errResponse);
            }
          );
        return deferred.promise;
      }

      function prepareDto(event) {
        var eventDto = {};
        eventDto.id = event.id;
        eventDto.name = event.title;
        eventDto.start = event.start;//.time();
        eventDto.end = event.end;
        eventDto.room = event.resourceId;
        return eventDto;
      }

      function updateEvent(event, id) {

        var eventDto = prepareDto(event);

        console.log('Updating Event with id '+id);
        var deferred = $q.defer();
        $http.put(urls.EVENT_SERVICE_API + id, eventDto)
          .then(
            function (response) {
              loadAllEvents();
              deferred.resolve(response.data);
            },
            function (errResponse) {
              console.error('Error while updating Event with id :'+id);
              deferred.reject(errResponse);
            }
          );
        return deferred.promise;
      }

      function removeEvent(id) {
        console.log('Removing Event with id '+id);
        var deferred = $q.defer();
        $http.delete(urls.EVENT_SERVICE_API + id)
          .then(
            function (response) {
              loadAllEvents();
              deferred.resolve(response.data);
            },
            function (errResponse) {
              console.error('Error while removing Event with id :'+id);
              deferred.reject(errResponse);
            }
          );
        return deferred.promise;
      }

    }
  ]);