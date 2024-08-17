create table todo
(
    id            char(32)     not null comment '主键'
        primary key,
    title         varchar(200) null comment '标题',
    description   longtext     null comment '描述',
    create_time   datetime     null comment '创建时间',
    update_time   datetime     null comment '最近更新时间'
)
    comment 'todo';

