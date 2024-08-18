import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';

import { Droppable } from '../components/dnd/Droppable';
import { Draggable } from '../components/dnd/Draggable';

import '../common/disk.css'


function Disk() {
    return <>
        <div className='disk'>

        </div>
    </>
}

export default function DndDemo() {

    // 已备份磁盘
    const sourceDisks = ['固态盘1T', '机械盘2T', '机械盘512G'];

    //  目标磁盘
    const targetDisks = ['固态盘1T', '机械盘2T', '机械盘512G'];

    const [parent, setParent] = useState(null);
    const draggableMarkup = (
        <Draggable id="draggable">Drag me</Draggable>
    );

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="container">
                
                <div className="disk-list" id="source-disks">
                    <h3>数据源磁盘列表</h3>
                    <div className="disk-item">磁盘 1</div>
                    <div className="disk-item">磁盘 2</div>
                    <div className="disk-item">磁盘 3</div>
                </div>

               
                <div className="disk-list" id="target-disks">
                    <h3>待恢复磁盘列表</h3>
                    <div className="disk-item">磁盘 A</div>
                    <div className="disk-item">磁盘 B</div>
                    <div className="disk-item">磁盘 C</div>
                </div>
            </div>
            {parent === null ? draggableMarkup : null}

            {targetDisks.map((id) => (
                // We updated the Droppable component so it would accept an `id`
                // prop and pass it to `useDroppable`
                <Droppable key={id} id={id}>
                    {parent === id ? draggableMarkup : 'Drop here'}
                </Droppable>
            ))}

        </DndContext>
    );

    function handleDragEnd(event) {
        const { over } = event;

        // If the item is dropped over a container, set it as the parent
        // otherwise reset the parent to `null`
        setParent(over ? over.id : null);
    }
};