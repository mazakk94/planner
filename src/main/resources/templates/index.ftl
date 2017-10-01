<!DOCTYPE html>

<html lang="en" ng-app="crudApp">
    <head>
        <title>${title}</title>
        <link href="css/bootstrap.css" rel="stylesheet"/>
        <link href="css/app.css" rel="stylesheet"/>        
        <link href='css/fullcalendar.css' rel='stylesheet' />
        <link href='css/scheduler.css' rel='stylesheet' /> 
    </head>
    <body>
        <script src="js/lib/angular.min.js" ></script>
        <script src="js/lib/angular-ui-router.min.js" ></script>
        <script src="js/lib/localforage.min.js" ></script>
        <script src="js/lib/ngStorage.min.js"></script>
        <script src="js/app/app.js"></script>
        <script src='js/lib/moment.js'></script>
        <script src='js/lib/jquery.js'></script>
        <script src='js/lib/fullcalendar.js'></script>
        <script src='js/lib/scheduler.js'></script>
        <script src='js/lib/require.js'></script>
        <#--  <script src="js/app/UserService.js"></script>  -->
        <#--  <script src="js/app/UserController.js"></script>  -->
        <script src="js/app/EventService.js"></script>
        <script src="js/app/CalendarService.js"></script>
        <script src="js/app/EventController.js"></script>
        <div ui-view></div>
    </body>
</html>