import React from "react";
import { Draggable } from "react-beautiful-dnd";
import Edit from "../svg/Edit";
import Delete from "../svg/Delete";

const List = ({ name, index, id, parent }) => {
    const formatName = (name) => {
        if (name.length <= 20) return name;
        return name.substring(0, 20) + "...";
    };
    return (
        <Draggable draggableId={name} index={index}>
            {(provided) => (
                <div
                    className="item"
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <p>{formatName(name)}</p>
                    <Edit parent={parent} id={id} />
                    <Delete parent={parent} id={id} />
                </div>
            )}
        </Draggable>
    );
};

export default List;
