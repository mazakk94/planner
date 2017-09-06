package com.mazaq.planner.service;


import java.text.ParseException;
import java.util.List;

import com.mazaq.planner.model.Event;
import com.mazaq.planner.shared.EventDto;

public interface EventService {
	
	Event findById(Integer id);

	Event findByName(String name);

	void saveEvent(Event event);

	void updateEvent(Event event);

	void deleteEventById(Integer id);

	void deleteAllEvents();

	List<Event> findAllEvents();

	boolean isEventExist(Event event);

	Event updateEvent(Event currentEvent, EventDto eventDto) throws ParseException;
}