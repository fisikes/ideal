package org.fisikes.server.api.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "todo")
public class Todo {

    @Id
    private String id;

    private String title;

    private String description;

    private LocalDateTime createTime;

    private LocalDateTime updateTime;
}
