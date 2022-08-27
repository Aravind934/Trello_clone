import React, { useContext } from "react";
import List from "./List";
import Plus from "../svg/Plus";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import { Droppable } from "react-beautiful-dnd";
import { DataContext } from "../context/DataContext";

function ListContainers({ name }) {
    let data = useContext(DataContext);
    return (
        <Droppable droppableId={name}>
            {(provided) => (
                <div
                    className="toDoContainer"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    <h5>{name}</h5>
                    {data[name].map((item, idx) => (
                        <List
                            name={item.name}
                            id={item._id}
                            key={item._id}
                            index={idx}
                            parent={name}
                        />
                    ))}
                    <Tippy content="Add new item">
                        <Plus name={name} />
                    </Tippy>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}

export default ListContainers;
