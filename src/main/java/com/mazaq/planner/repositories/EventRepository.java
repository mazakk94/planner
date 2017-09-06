package com.mazaq.planner.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mazaq.planner.model.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {

    Event findByName(String name);

}
