package com.mazaq.planner.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.mazaq.planner.model.Event;
import com.mazaq.planner.shared.EventDto;


public final class ConverterUtil {
    
    public static EventDto convert(Event event) throws ParseException {
    	EventDto eventDto = new EventDto();

        final String OLD_FORMAT = "yyyy-MM-dd HH:mm:ss.S";
        final String NEW_FORMAT = "yyyy-MM-dd HH:mm:ss";
        SimpleDateFormat sdf = new SimpleDateFormat(OLD_FORMAT);
        Date d = sdf.parse(event.getStart().toString());
        sdf.applyPattern(NEW_FORMAT);
        String whenConverted = sdf.format(d);
        
        sdf.applyPattern(OLD_FORMAT);
        d = sdf.parse(event.getEnd().toString());
        sdf.applyPattern(NEW_FORMAT);
        String toConverted = sdf.format(d);	            
		
		eventDto.setId(event.getId());
		eventDto.setStart(whenConverted);
		eventDto.setEnd(toConverted);
		eventDto.setName(event.getName());
		eventDto.setRoom(event.getRoom());    	
    	
        return eventDto;
    }
}
