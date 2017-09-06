package com.mazaq.planner.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mazaq.planner.model.Room;
import com.mazaq.planner.repositories.RoomRepository;


@Service("roomService")
@Transactional
public class RoomServiceImpl implements RoomService{

	@Autowired
	private RoomRepository roomRepository;

	public Room findById(Integer id) {
		return roomRepository.findOne(id);
	}

	public Room findByName(String name) {
		return roomRepository.findByName(name);
	}

	public void saveRoom(Room room) {
		roomRepository.save(room);
	}

	public void updateRoom(Room room){
		saveRoom(room);
	}

	public void deleteRoomById(Integer id){
		roomRepository.delete(id);
	}

	public void deleteAllRooms(){
		roomRepository.deleteAll();
	}

	public List<Room> findAllRooms(){
		return roomRepository.findAll();
	}

	public boolean isRoomExist(Room room) {
		return findByName(room.getName()) != null;
	}

}