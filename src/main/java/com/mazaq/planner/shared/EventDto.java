package com.mazaq.planner.shared;

import java.text.SimpleDateFormat;

public class EventDto {
	
	SimpleDateFormat formatter = new SimpleDateFormat("dd MM yyyy HH:mm:ss");
	
	private Integer id;	
	private String name;
	private String start;
	private String end;
	
	public String getStart() {
		return start;
	}

	public void setStart(String start) {
		this.start = start;
	}

	public String getEnd() {
		return end;
	}

	public void setEnd(String end) {
		this.end = end;
	}

	private Integer room;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;

//		EventDto user = (EventDto) o;

		Object age = null;
		// if (Double.compare(user.salary, salary) != 0) return false;
		// if (id != null ? !id.equals(user.id) : user.id != null) return false;
		// if (name != null ? !name.equals(user.name) : user.name != null)
		// return false;
		return age != null;// != null ? age.equals(user.age) : user.age == null;
	}

	@Override
	public int hashCode() {
		int result = 0;
		// long temp;
		// result = id != null ? id.hashCode() : 0;
		// result = 31 * result + (name != null ? name.hashCode() : 0);
		// result = 31 * result + (age != null ? age.hashCode() : 0);
		// temp = Double.doubleToLongBits(salary);
		// result = 31 * result + (int) (temp ^ (temp >>> 32));
		return result;
	}

	public Integer getRoom() {
		return room;
	}

	public void setRoom(Integer room) {
		this.room = room;
	}	
}
