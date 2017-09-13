var app = angular.module('crudApp',['ui.router','ngStorage']);

// app.constant('urls', {
//     BASE: 'http://localhost:8080/PlannerApp',
//     ROOM_SERVICE_API : 'http://localhost:8080/PlannerApp/api/room/',
//     EVENT_SERVICE_API : 'http://localhost:8080/PlannerApp/api/event/'
// });
app.constant('urls', {
    BASE: 'http://powerful-brook-93779.herokuapp.com/PlannerApp',
    ROOM_SERVICE_API : 'http://powerful-brook-93779.herokuapp.com/PlannerApp/api/room/',
    EVENT_SERVICE_API : 'http://powerful-brook-93779.herokuapp.com/PlannerApp/api/event/'
});

app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider      
        .state('events', {
            url: '/',
            templateUrl: 'partials/list',
            controller:'EventController',
            controllerAs:'ctrl',
            resolve: {
                events: function ($q, EventService, CalendarService) {
                    console.log('Load all events');
                }
            }
        });
        $urlRouterProvider.otherwise('/');
    }]);

