import React, { useState } from "react";
import "./DiskMapping.css";

const DiskMapping = () => {
    const [targetDisks, setTargetDisks] = useState([
        { name: "A", content: null },
        { name: "B", content: null },
        { name: "C", content: null },
    ]);

    const [sourceDisks, setSourceDisks] = useState([
        { name: "1", content: null },
        { name: "2", content: null },
        { name: "3", content: null },
        { name: "4", content: null },
    ]);

    const handleDragStart = (e, disk) => {
        e.dataTransfer.setData("disk", disk);
    };

    const handleDrop = (e, index) => {
        const diskName = e.dataTransfer.getData("disk");
        const newTargetDisks = [...targetDisks];

        for (const disk of newTargetDisks) {
            if (disk.content === diskName) {
                disk.content = null;
            }
        }

        newTargetDisks[index].content = diskName;
        setTargetDisks(newTargetDisks);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };


  const handleSelectChange = (e, index) => {
    const selectedDisk = e.target.value;
    const newTargetDisks = [...targetDisks];
    newTargetDisks[index].content = selectedDisk;
    setTargetDisks(newTargetDisks);
  };

    return (
        <div className="container">

            <div className="disk-list" id="source-disks">
                <h3>source list</h3>

                {sourceDisks.map((disk, index) => (
                    <div key={index} className="disk-item" draggable onDragStart={(e) => handleDragStart(e, disk.name)}>{disk.name}</div>
                ))}
            </div>


            <div className="disk-list" id="target-disks">
                <h3>target list</h3>
                {targetDisks.map((disk, index) => (
                    <div key={index} className="disk-item target-disk">
                        <div className="disk-name">{disk.name}</div>
                        <div
                            className="inner-div"
                            onDrop={(e) => handleDrop(e, index)}
                            onDragOver={handleDragOver}
                        >
                            {disk.content ? (
                                disk.content
                            ) : (
                                <select
                                    className="disk-select"
                                    onChange={(e) => handleSelectChange(e, index)}
                                    value=""
                                >
                                    <option value="">choose source disk</option>
                                    {sourceDisks.map((sourceDisk, index) => (
                                        <option key={index} value={sourceDisk.name}>
                                            {sourceDisk.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DiskMapping;
