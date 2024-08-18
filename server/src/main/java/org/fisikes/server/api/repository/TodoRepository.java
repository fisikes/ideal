package org.fisikes.server.api.repository;

import org.fisikes.server.api.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, String> {

}
