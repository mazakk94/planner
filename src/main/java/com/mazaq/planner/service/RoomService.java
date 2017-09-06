package com.mazaq.planner.service;


import java.util.List;

import com.mazaq.planner.model.Room;

public interface RoomService {
	
	Room findById(Integer id);

	Room findByName(String name);

	void saveRoom(Room room);

	void updateRoom(Room room);

	void deleteRoomById(Integer id);

	void deleteAllRooms();

	List<Room> findAllRooms();

	boolean isRoomExist(Room room);
}