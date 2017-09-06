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
        <script src="js/app/EventController.js"></script>
        <div ui-view></div>

        <script type="text/javascript" src="//code.jquery.com/jquery-1.9.1.js" ie.="" data-type=""></script>
        <script type="text/javascript" src="//code.jquery.com/ui/1.9.2/jquery-ui.js"></script>
        <link rel="stylesheet" type="text/css" href="//code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css">
        <link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.3.0/fullcalendar.min.css">
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.9.0/moment.min.js"></script>
        <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.3.0/fullcalendar.min.js "></script>
        <script type="text/javascript" src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
        <link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">




    </body>
</html>