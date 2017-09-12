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
        removeEvent: removeEvent,
        updateAllEvents: updateAllEvents,
        createOrUpdateEvent: createOrUpdateEvent
      };

      return factory;

      function refreshCalendar() {
        var array = $('#calendar').fullCalendar( 'clientEvents' );
        var events = $localStorage.events;
        $('#calendar').fullCalendar( 'removeEvents');
        $('#calendar').fullCalendar( 'addEventSource', events); 
        $('#calendar').fullCalendar( 'rerenderEvents');        
      }

      function loadAllEvents() {
        console.log('Fetching all events');
        var deferred = $q.defer();
        $http.get(urls.EVENT_SERVICE_API)
          .then(
            function (response) {
              console.log('Fetched successfully all events');
              $localStorage.events = prepareEvents(response.data);
              refreshCalendar();
              // getAllEvents();
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

      function prepareEvent(item) {
        var event = {};
        event.id = item.id;
        event.title = item.name;
        event.start = item.start;
        event.end = item.end;
        event.resourceId = item.room;
        return event;
      }

      function prepareEvents(data) {
        var result = [];
        for(var i = 0; i < data.length; i++) {
          var item = data[i];
          var event = {};
          event = prepareEvent(item);
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
              events : $localStorage.events,
              color: '#3399ff',
              editable: true
            },
          ],
          eventRender: function( event, element, view ) {
            if(event.changing){ // If this event is being changed, grab its render date
              $("#currenttime").html("Start: "+event.start.format("YYYY-MM-DD hh:mma")+"<br> End: "+event.end.format("YYYY-MM-DD hh:mma"));
              // alert('event length: ' + (event.start - event.end).format("YYYY-MM-DD hh:mma"));
            }
          },
          eventResizeStart: function(event, jsEvent, ui, view ){
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

            event.id = getEventIdFromSelect(event._id);

            var diffMs = null;
            if (event.end !== undefined && event.end !== null && event.start !== undefined && event.start !== null) {
              var diffMs = (event.end.time() - event.start.time()) / 60000;
            }                         

            if (diffMs !== null && diffMs > 120) {
              if (confirm("is 120 okay rather than " + diffMs + "?")) {
                event.end = moment(new Date(event.start + (120 * 60000)));
                event.rendering = 'background';
                createOrUpdateEvent(event);
                return;
              } else {
                revertFunc();
              }
            }

            if (diffMs !== null) {
              createOrUpdateEvent(event);
            }

            event.changing = true;
            
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
            createOrUpdateEvent(event);
          },
          dayClick: function(date, jsEvent, view, resourceObj) {   
            date.format();
            var prawda = false;
          },

          eventClick: function(calEvent, jsEvent, view) {
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
          resources: $localStorage.rooms,

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
              createEvent(event);
            }
            $('#calendar').fullCalendar('unselect');
            var array = [];
            array = $('#calendar').fullCalendar( 'clientEvents' );  
            $('#calendar').fullCalendar( 'refetchEventSources', array );
            // updateAllEvents();
          }
        });

        $("#edit").click(function(e) {
          e.preventDefault();
      
          var title = $("#required-input").val().trim();
          if (!title) {
            return;
          }
          var event = $(".cont").data('event'),
            isAdd = !event;
          if (isAdd) {
            event = {};
            event.start = '2014-11-12';
          }
          event.title = title;
          if (isAdd) {
            $('#calendar').fullCalendar('renderEvent', event, true);
          } else {
            $('#calendar').fullCalendar('updateEvent', event);
          }
          $(".cont").hide().removeData('event');
        });
      
        $("#add").click(function(e) {
          $(".cont").show();
        });

        return $localStorage.events;
      }

      function createOrUpdateEvent(event) {
        // if (event._id === undefined){          
        if (event._id !== undefined && (event.id === undefined || event.id === null)){
          event.id = getEventIdFromSelect(event._id);
        }
        if (event.id !== undefined) {
          updateEvent(event, event.id);
          $('#calendar').fullCalendar('updateEvent', event);
        } else {
          createEvent(event);
        }        
      }

      function getCalendarEventById(id){        
        var events = $('#calendar').fullCalendar( 'clientEvents' );        
        for (var i=0; i < events.length; i++) {
            if (events[i].id === id) {
                return events[i];
            }
        }
        return null;
      }

      function getEventIdFromSelect(_id){
        // var events = $localStorage.events;
        var events = $('#calendar').fullCalendar( 'clientEvents' );        
        for (var i=0; i < events.length; i++) {
            if (events[i]._id === _id) {
                return events[i].id;
            }
        }
        return null;
      }

      function updateAllEvents() {
        var events = $('#calendar').fullCalendar( 'clientEvents' );
        var eventDtos = [];
        for (var i=0; i<events.length; i++) {
          var event = events[i];
          eventDtos.push(prepareDto(event));
        }        
        var deferred = $q.defer();
        $http.put(urls.EVENT_SERVICE_API, eventDtos)
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
        var eventDto = {};
        eventDto = prepareDto(event);
        console.log('Creating Event');
        var deferred = $q.defer();
        $http.post(urls.EVENT_SERVICE_API, eventDto)
          .then(
            function (response) {              
              var eventDto = response.data;
              event = prepareEvent(eventDto);                
              $('#calendar').fullCalendar('updateEvent', event);
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
        eventDto.id = event.id === undefined? null : event.id;
        eventDto.name = event.title;
        eventDto.start = event.start;//.time();
        eventDto.end = event.end;
        eventDto.room = event.resourceId;
        return eventDto;
      }

      function updateEvent(event, id) {
        var eventDto = prepareDto(event);        
        console.log('Updating Event with id '+id);
        $('#calendar').fullCalendar('updateEvent', event);
        var deferred = $q.defer();
        $http.put(urls.EVENT_SERVICE_API + id, eventDto)
          .then(
            function (response) {
              loadAllEvents();
              // $('#calendar').fullCalendar('updateEvent', event);
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
        // var calEvent = getCalendarEventById(id);
        var deferred = $q.defer();
        $http.delete(urls.EVENT_SERVICE_API + id)
          .then(
            function (response) {
              $('#calendar').fullCalendar( 'removeEventSources' );
              $localStorage.events = prepareEvents(response.data); 
              var events = [];
              events = $localStorage.events;     
              for(var i=0; i<events.length; i++){
                $('#calendar').fullCalendar( 'addEventSource', events[i] );               
              }

              $('#calendar').fullCalendar( 'rerenderEvents');
              refreshCalendar();
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