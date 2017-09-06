package com.mazaq.planner.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mazaq.planner.model.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {

	Room findByName(String name);
}
