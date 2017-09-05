package com.mazaq.planner.service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mazaq.planner.model.Event;
import com.mazaq.planner.repositories.EventRepository;
import com.mazaq.planner.shared.EventDto;



@Service("eventService")
@Transactional
public class EventServiceImpl implements EventService{

	@Autowired
	private EventRepository eventRepository;

	public Event findById(Long id) {
		return eventRepository.findOne(id);
	}

	public Event findByName(String name) {
		return eventRepository.findByName(name);
	}

	public void saveEvent(Event event) {
		eventRepository.save(event);
	}

	public void updateEvent(Event event){
		saveEvent(event);
	}	

	public void deleteEventById(Long id){
		eventRepository.delete(id);
	}

	public void deleteAllEvents(){
		eventRepository.deleteAll();
	}

	public List<Event> findAllEvents(){
		return eventRepository.findAll();
	}

	public boolean isEventExist(Event event) {
		return findByName(event.getName()) != null;
	}

	@Override
	public Event updateEvent(Event currentEvent, EventDto eventDto) throws ParseException {
		currentEvent.setName(eventDto.getName());
		currentEvent.setRoom(eventDto.getRoom());	
				
		String string = eventDto.getStart();			
		DateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.ENGLISH);
		Date whenConverted = format.parse(string);								
		string = eventDto.getEnd();
		Date toConverted = format.parse(string);			
		currentEvent.setStart(whenConverted);
		currentEvent.setEnd(toConverted);		
		
		updateEvent(currentEvent);		
//		format = new SimpleDateFormat("EEE MMM dd HH:mm:ss zzz yyyy", Locale.US);
		return currentEvent;
	}	
	

}
