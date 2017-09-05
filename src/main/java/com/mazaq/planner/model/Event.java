package com.mazaq.planner.model;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "APP_EVENT")
public class Event implements Serializable {

	private static final long serialVersionUID = 2966704200290943399L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotEmpty
	@Column(name = "NAME", nullable = false)
	private String name;

	@Column(name = "LENGTH", nullable = false) //deprecated
	private Integer length;

	@Column(name="ROOM", nullable=false)
	private Integer room;
		
	@Column(name="START_DATE", nullable=false)
	private Date start;
	
	@Column(name="END_DATE", nullable=false)
	private Date end;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getLength() {
		return length;
	}

	public void setLength(Integer length) {
		this.length = length;
	}

	public Integer getRoom() {
		return room;
	}

	public void setRoom(Integer room) {
		this.room = room;
	}

	public Date getStart() {
		return start;
	}

	public void setStart(Date start) {
		this.start = start;
	}

	public Date getEnd() {
		return end;
	}

	public void setEnd(Date end) {
		this.end = end;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;

//		Event user = (Event) o;

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

	// @Override
	// public String toString() {
	// return "User [id=" + id + ", name=" + name + ", age=" + age
	// + ", salary=" + salary + "]";
	// }



}
