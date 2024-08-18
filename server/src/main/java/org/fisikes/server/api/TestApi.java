package org.fisikes.server.api;

import lombok.AllArgsConstructor;
import org.fisikes.server.api.entity.Todo;
import org.fisikes.server.api.repository.TodoRepository;
import org.fisikes.server.api.req.AddTodoReq;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
public class TestApi {


    private final TodoRepository todoRepository;

    @PostMapping("/add-todo")
    public R<Void> addTodo(@RequestBody AddTodoReq req) {

        final Todo todo = new Todo();
        todo.setId(UUID.randomUUID().toString().replace("-", ""));
        todo.setTitle(req.title());
        todo.setDescription(req.description());
        todo.setCreateTime(LocalDateTime.now());
        todo.setUpdateTime(LocalDateTime.now());
        Todo todoSaved = todoRepository.save(todo);
        return R.success(null);
    }

    @PostMapping("/test-page")
    public R<List<Todo>> testPage() {
        final Page<Todo> all = todoRepository.findAll(Pageable.ofSize(10).withPage(0));
        return R.success(all.getContent());
    }
}
