var app = angular.module('crudApp',['ui.router','ngStorage']);

app.constant('urls', {
    BASE: 'http://localhost:8080/PlannerApp',
    ROOM_SERVICE_API : 'http://localhost:8080/PlannerApp/api/room/',
    EVENT_SERVICE_API : 'http://localhost:8080/PlannerApp/api/event/'
});

// app.constant('urls', {
//     BASE: 'http://powerful-brook-93779.herokuapp.com/PlannerApp',
//     USER_SERVICE_API : 'http://powerful-brook-93779.herokuapp.com/PlannerApp/api/user/',
//     EVENT_SERVICE_API : 'http://powerful-brook-93779.herokuapp.com/PlannerApp/api/event/'
// });

app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
        // .state('home', {
        //     url: '/users',
        //     templateUrl: 'partials/list',
        //     controller:'UserController',
        //     controllerAs:'ctrl',
        //     resolve: {
        //         users: function ($q, UserService) {
        //             console.log('Load all users');
        //             var deferred = $q.defer();
        //             UserService.loadAllUsers().then(deferred.resolve, deferred.resolve);
        //             return deferred.promise;
        //         }
        //     }
        // })
        .state('events', {
            url: '/',
            templateUrl: 'partials/list',
            controller:'EventController',
            controllerAs:'ctrl',
            resolve: {
                events: function ($q, EventService) {
                    console.log('Load all events');
                    var deferred = $q.defer();                    
                    EventService.loadAllRooms().then(deferred.resolve, deferred.resolve);
                    // EventService.loadAllEvents().then(deferred.resolve, deferred.resolve);
                    return deferred.promise;
                }
            }
        });
        $urlRouterProvider.otherwise('/');
    }]);

