<div class="generic-container">
  <div class="panel panel-default">
    <!-- Default panel contents -->
    <div class="panel-heading"><span class="lead">Event </span></div>
		<div class="panel-body">
	    <div class="formcontainer">
	      <div class="alert alert-success" role="alert" ng-if="ctrl.successMesslength">{{ctrl.successMesslength}}</div>
	      <div class="alert alert-danger" role="alert" ng-if="ctrl.errorMesslength">{{ctrl.errorMesslength}}</div>
	      <form ng-submit="ctrl.submit()" name="myForm" class="form-horizontal">
	        <input type="hidden" ng-model="ctrl.event.id" />
	        <div class="row">
	          <div class="form-group col-md-12">
	            <label class="col-md-2 control-lable" for="uname">Name</label>
	            <div class="col-md-7">
	              <input type="text" ng-model="ctrl.event.name" id="uname" class="eventname form-control input-sm" placeholder="Enter event name" required ng-minlength="3"/>
	            </div>
	          </div>
	        </div>          

	        <div class="row">
	          <div class="form-group col-md-12">
	            <label class="col-md-2 control-lable" for="length">Length</label>
	            <div class="col-md-7">
								<span>From: </span>
								<input type="time" id="from" ng-model="ctrl.event.from" 								
								defaultValue="08:30" step="900" min="08:00" max="17:00" required />

								<span>To: </span>
								<input type="time" id="to"  ng-model="ctrl.event.to" 								
								placeholder="08:00" step="900" min="08:00" max="17:00" required />
	            </div>
	          </div>
	        </div>

					<div id='calendar'></div>

	        <div class="row">
	          <div class="form-group col-md-12">
	            <label class="col-md-2 control-lable" for="room">Room</label>
	            <div class="col-md-7">
	              <input type="text" ng-model="ctrl.event.room" id="room" class="form-control input-sm" placeholder="Enter your room." required ng-pattern="ctrl.onlyNumbers"/>
	            </div>
	          </div>
	        </div>

	        <div class="row">
	          <div class="form-actions floatRight">
	            <input type="submit"  value="{{!ctrl.event.id ? 'Add' : 'Update'}}" class="btn btn-primary btn-sm" ng-disabled="myForm.$invalid || myForm.$pristine">
	            <button type="button" ng-click="ctrl.reset()" class="btn btn-warning btn-sm" ng-disabled="myForm.$pristine">Reset Form</button>
	          </div>
	        </div>
	      </form>
  	  </div>
		</div>	
  </div>
  <div class="panel panel-default">
    <div class="panel-heading"><span class="lead">List of Events </span></div>
		<div class="panel-body">
			<div class="table-responsive">
		    <table class="table table-hover">
		      <thead>
		      <tr>
		        <th>ID</th>
		        <th>NAME</th>
		        <th>FROM</th>
		        <th>TO</th>
		        <th>LENGTH</th>
		        <th>ROOM</th>
		        <th width="100"></th>
		        <th width="100"></th>
		      </tr>
		      </thead>
		      <tbody>
		      <tr ng-repeat="u in ctrl.getAllEvents()">
		        <td>{{u.id}}</td>
		        <td>{{u.title}}</td>
		        <td>{{u.start}}</td>
		        <td>{{u.end}}</td>
		        <td>{{u.length}}</td>
		        <td>{{u.resourceId}}</td>
		        <td><button type="button" ng-click="ctrl.editEvent(u.id)" class="btn btn-success custom-width">Edit</button></td>
		        <td><button type="button" ng-click="ctrl.removeevent(u.id)" class="btn btn-danger custom-width">Remove</button></td>
		      </tr>
		      </tbody>
		    </table>		
			</div>
		</div>
  </div>
</div>