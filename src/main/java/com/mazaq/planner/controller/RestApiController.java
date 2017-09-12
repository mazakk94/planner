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
import com.mazaq.planner.model.Room;
import com.mazaq.planner.service.EventService;
import com.mazaq.planner.service.RoomService;
import com.mazaq.planner.service.UserService;
import com.mazaq.planner.shared.EventDto;
import com.mazaq.planner.shared.RoomDto;
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

	@Autowired
	RoomService roomService;

	@RequestMapping(value = "/room/", method = RequestMethod.GET)
	public ResponseEntity<List<RoomDto>> listAllRooms() {
		List<Room> rooms = roomService.findAllRooms();
		if (rooms.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}

		List<RoomDto> response = new ArrayList<>();
		for (Room room : rooms) {
			RoomDto dto = new RoomDto();
			dto.setId(room.getId());
			dto.setName(room.getName());
			response.add(dto);
		}

		return new ResponseEntity<List<RoomDto>>(response, HttpStatus.OK);
	}

	@RequestMapping(value = "/event/", method = RequestMethod.GET)
	public ResponseEntity<List<EventDto>> listAllEvents() throws ParseException {
		List<EventDto> eventDtos = new ArrayList<EventDto>();
		List<Event> events = eventService.findAllEvents();

		if (events.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}

		for (Event event : events) {
			EventDto eventDto = new EventDto();
			eventDto = ConverterUtil.convert(event);
			eventDtos.add(eventDto);
		}
		return new ResponseEntity<List<EventDto>>(eventDtos, HttpStatus.OK);
	}

	@RequestMapping(value = "/event/{id}", method = RequestMethod.GET) // TODO
	public ResponseEntity<?> getEvent(@PathVariable("id") Integer id) {
		logger.info("Fetching Event with id {}", id);
		Event event = eventService.findById(id);
		if (event == null) {
			logger.error("Event with id {} not found.", id);
			return new ResponseEntity<>(new CustomErrorType("Event with id " + id + " not found"),
					HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Event>(event, HttpStatus.OK); // dto
	}

	@RequestMapping(value = "/event/", method = RequestMethod.POST) // TODO
																	// przetestowac
	public ResponseEntity<?> createEvent(@RequestBody EventDto eventDto, UriComponentsBuilder ucBuilder)
			throws ParseException {
		logger.info("Creating Event");

		Event event = new Event();
		if (eventDto != null) {
			event = prepareEvent(eventDto);
			eventService.saveEvent(event);//
		}

		if (event != null && event.getId() != null) {
			eventDto.setId(event.getId());
		}

		return new ResponseEntity<EventDto>(eventDto, HttpStatus.OK);
	}

	@RequestMapping(value = "/event/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateEvent(@PathVariable("id") Integer id, @RequestBody EventDto eventDto)
			throws ParseException {
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

	@RequestMapping(value = "/event/", method = RequestMethod.PUT)
	public ResponseEntity<?> updateAllEvents(@RequestBody List<EventDto> eventDtos) throws ParseException {
		logger.info("Updating Events");

		for (EventDto eventDto : eventDtos) {
			if (eventDto.getId() != null) {
				Event currentEvent = eventService.findById(eventDto.getId());
				eventService.updateEvent(currentEvent, eventDto);
			} else {
				Event event = new Event();
				event = prepareEvent(eventDto);
				eventService.saveEvent(event);
			}
		}
		return new ResponseEntity<>("", HttpStatus.OK);
	}

	private Event prepareEvent(EventDto eventDto) throws ParseException {
		Event event = new Event();

		event.setName(eventDto.getName());
		Room room = roomService.findById(eventDto.getRoom());
		event.setRoom(room);
		String string = eventDto.getStart();
		DateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.ENGLISH);
		Date whenConverted = format.parse(string);
		string = eventDto.getEnd();
		Date toConverted = format.parse(string);

		event.setStart(whenConverted);
		event.setEnd(toConverted);
		return event;
	}

	@RequestMapping(value = "/event/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteEvent(@PathVariable("id") Integer id) throws ParseException {
		logger.info("Fetching & Deleting Event with id {}", id);

		Event event = eventService.findById(id);
		if (event == null) {
			logger.error("Unable to delete. Event with id {} not found.", id);
			return new ResponseEntity<>(new CustomErrorType("Unable to delete. Event with id " + id + " not found."),
					HttpStatus.NOT_FOUND);
		}
		eventService.deleteEventById(id);
		List<Event> events = eventService.findAllEvents();
		List<EventDto> response = new ArrayList<>();
		for (Event e : events) {
			EventDto eventDto = ConverterUtil.convert(e);
			response.add(eventDto);
		}
		return new ResponseEntity<List<EventDto>>(response, HttpStatus.OK);
	}

	@RequestMapping(value = "/event/", method = RequestMethod.DELETE)
	public ResponseEntity<Event> deleteAllEvents() {
		logger.info("Deleting All Events");

		eventService.deleteAllEvents();
		return new ResponseEntity<Event>(HttpStatus.NO_CONTENT);
	}

}