package com.mazaq.planner.controller;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.mazaq.planner.model.Event;
import com.mazaq.planner.model.User;
import com.mazaq.planner.service.EventService;
import com.mazaq.planner.service.UserService;
import com.mazaq.planner.shared.EventDto;
import com.mazaq.planner.util.ConverterUtil;
import com.mazaq.planner.util.CustomErrorType;

@RestController
@RequestMapping("/api")
public class RestApiController {

	public static final Logger logger = LoggerFactory.getLogger(RestApiController.class);

	@Autowired
	UserService userService;

	@Autowired
	EventService eventService;

	// -------------------Retrieve All Users---------------------------------------------

	@RequestMapping(value = "/user/", method = RequestMethod.GET)
	public ResponseEntity<List<User>> listAllUsers() {
		List<User> users = userService.findAllUsers();
		if (users.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<User>>(users, HttpStatus.OK);
	}

	// -------------------Retrieve Single User------------------------------------------

//	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getUser(@PathVariable("id") long id) {
		logger.info("Fetching User with id {}", id);
		User user = userService.findById(id);
		if (user == null) {
			logger.error("User with id {} not found.", id);
			return new ResponseEntity<>(new CustomErrorType("User with id " + id 
					+ " not found"), HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}

	// -------------------Create a User-------------------------------------------

	@RequestMapping(value = "/user/", method = RequestMethod.POST)
	public ResponseEntity<?> createUser(@RequestBody User user, UriComponentsBuilder ucBuilder) {
		logger.info("Creating User : {}", user);

		if (userService.isUserExist(user)) {
			logger.error("Unable to create. A User with name {} already exist", user.getName());
			return new ResponseEntity<>(new CustomErrorType("Unable to create. A User with name " + 
			user.getName() + " already exist."),HttpStatus.CONFLICT);
		}
		userService.saveUser(user);

		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(ucBuilder.path("/api/user/{id}").buildAndExpand(user.getId()).toUri());
		return new ResponseEntity<String>(headers, HttpStatus.OK);
	}

	// ------------------- Update a User ------------------------------------------------

	@RequestMapping(value = "/user/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateUser(@PathVariable("id") long id, @RequestBody User user) {
		logger.info("Updating User with id {}", id);

		User currentUser = userService.findById(id);

		if (currentUser == null) {
			logger.error("Unable to update. User with id {} not found.", id);
			return new ResponseEntity<>(new CustomErrorType("Unable to upate. User with id " + id + " not found."),
					HttpStatus.NOT_FOUND);
		}

//		currentUser.setLength(user.getLength());
//		currentUser.setRoom(user.getRoom());
		currentUser.setName(user.getName());
		currentUser.setAge(user.getAge());
		currentUser.setSalary(user.getSalary());

		userService.updateUser(currentUser);
		return new ResponseEntity<User>(currentUser, HttpStatus.OK);
	}

	// ------------------- Delete a User-----------------------------------------

	@RequestMapping(value = "/user/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteUser(@PathVariable("id") long id) {
		logger.info("Fetching & Deleting User with id {}", id);

		User user = userService.findById(id);
		if (user == null) {
			logger.error("Unable to delete. User with id {} not found.", id);
			return new ResponseEntity<>(new CustomErrorType("Unable to delete. User with id " + id + " not found."),
					HttpStatus.NOT_FOUND);
		}
		userService.deleteUserById(id);
		return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
	}

	// ------------------- Delete All Users-----------------------------

	@RequestMapping(value = "/user/", method = RequestMethod.DELETE)
	public ResponseEntity<User> deleteAllUsers() {
		logger.info("Deleting All Users");

		userService.deleteAllUsers();
		return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
	}
	
	
	
	// -------------------Retrieve All Events---------------------------------------------

		@RequestMapping(value = "/event/", method = RequestMethod.GET)
		public ResponseEntity<List<EventDto>> listAllEvents() throws ParseException {
			List<EventDto> eventDtos = new ArrayList<EventDto>();
			List<Event> events = eventService.findAllEvents();
			
			if (events.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT); // You many decide to return HttpStatus.NOT_FOUND
			}
			
			for (Event event : events) {
				EventDto eventDto = new EventDto();
				eventDto = ConverterUtil.convert(event);	
				eventDtos.add(eventDto);
			}			
			return new ResponseEntity<List<EventDto>>(eventDtos, HttpStatus.OK);
		}

		// -------------------Retrieve Single Event------------------------------------------

		@RequestMapping(value = "/event/{id}", method = RequestMethod.GET)		//TODO
		public ResponseEntity<?> getEvent(@PathVariable("id") long id) {
			logger.info("Fetching Event with id {}", id);
			Event event = eventService.findById(id);
			if (event == null) {
				logger.error("Event with id {} not found.", id);
				return new ResponseEntity<>(new CustomErrorType("Event with id " + id 
						+ " not found"), HttpStatus.NOT_FOUND);
			}
			return new ResponseEntity<Event>(event, HttpStatus.OK); //dto
		}

		// -------------------Create a Event-------------------------------------------

		@RequestMapping(value = "/event/", method = RequestMethod.POST)	//TODO przetestowac
		public ResponseEntity<?> createEvent(@RequestBody EventDto eventDto, UriComponentsBuilder ucBuilder) throws ParseException {
			logger.info("Creating Event : {}");//, event);

			Event event = new Event();
			if (eventDto != null) {				
//				long diff = eventDto.getTo().getTime() - eventDto.getFrom().getTime();
//				int minutes = (int) TimeUnit.MILLISECONDS.toMinutes(diff); 
//				event.setLength(minutes);
				event.setName(eventDto.getName());
				event.setRoom(eventDto.getRoom());
				
				
//				2017-09-03T12:30:00
//				SimpleDateFormat sfdate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss a");
//				Date date = new Date();
				
//				final String OLD_FORMAT = "yyyy-MM-dd HH:mm:ss";
//				final String NEW_FORMAT = "yyyy-MM-dd HH:mm:ss a";
				
				String string = eventDto.getStart();
				DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.ENGLISH);
				Date whenConverted = format.parse(string);								
				string = eventDto.getEnd();
				Date toConverted = format.parse(string);
				
				event.setStart(whenConverted);
				event.setEnd(toConverted);
			}			

			if (eventService.isEventExist(event)) {
				logger.error("Unable to create. A Event with name {} already exist", event.getName());
				return new ResponseEntity<>(new CustomErrorType("Unable to create. A Event with name " + 
				event.getName() + " already exist."),HttpStatus.CONFLICT);
			}
			eventService.saveEvent(event);

			HttpHeaders headers = new HttpHeaders();
			headers.setLocation(ucBuilder.path("/api/event/{id}").buildAndExpand(event.getId()).toUri());
			return new ResponseEntity<String>(headers, HttpStatus.OK);
		}

		// ------------------- Update a Event ------------------------------------------------

		@RequestMapping(value = "/event/{id}", method = RequestMethod.PUT)
		public ResponseEntity<?> updateEvent(@PathVariable("id") long id, @RequestBody EventDto eventDto) throws ParseException {
			logger.info("Updating Event with id {}", id);

			Event currentEvent = eventService.findById(id);

			if (currentEvent == null) {
				logger.error("Unable to update. Event with id {} not found.", id);
				return new ResponseEntity<>(new CustomErrorType("Unable to upate. Event with id " + id + " not found."),
						HttpStatus.NOT_FOUND);
			}
			eventService.updateEvent(currentEvent, eventDto);
			
			return new ResponseEntity<>("", HttpStatus.OK);
		}

		// ------------------- Delete a Event-----------------------------------------

		@RequestMapping(value = "/event/{id}", method = RequestMethod.DELETE)
		public ResponseEntity<?> deleteEvent(@PathVariable("id") long id) {
			logger.info("Fetching & Deleting Event with id {}", id);

			Event event = eventService.findById(id);
			if (event == null) {
				logger.error("Unable to delete. Event with id {} not found.", id);
				return new ResponseEntity<>(new CustomErrorType("Unable to delete. Event with id " + id + " not found."),
						HttpStatus.NOT_FOUND);
			}
			eventService.deleteEventById(id);
			return new ResponseEntity<Event>(HttpStatus.NO_CONTENT); //TODO
		}

		// ------------------- Delete All Events-----------------------------

		@RequestMapping(value = "/event/", method = RequestMethod.DELETE)
		public ResponseEntity<Event> deleteAllEvents() {
			logger.info("Deleting All Events");

			eventService.deleteAllEvents();
			return new ResponseEntity<Event>(HttpStatus.NO_CONTENT);
		}

}