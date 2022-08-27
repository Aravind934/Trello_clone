import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import "./App.css";
import ListContainers from "./components/ListContainers";
import Model from "./components/Model";
import { DataContext } from "./context/DataContext";

const App = () => {
    let [isOpen, setisOpen] = useState(false);
    let [id, setId] = useState(2);
    let [editItemId, setEditItemId] = useState(null);
    let [activeList, setActiveList] = useState("");
    let [Todo, setTodo] = useState([{ _id: 1, name: "Sample" }]);
    let [Completed, setCompleted] = useState([]);
    let [Done, setDone] = useState([]);

    const open = () => setisOpen(true);
    const close = () => {
        setisOpen(false);
        setEditItemId(null);
    };
    const addOrEditData = (val) => {
        let newData = { _id: id, name: val };
        let temp;
        let storage;
        if (activeList === "Todo") {
            if (editItemId) {
                temp = [...Todo];
                temp.find((item) => item._id === editItemId).name = val;
                setTodo(temp);
                storage = temp;
            } else {
                setTodo([...Todo, newData]);
                storage = [...Todo, newData];
            }
            localStorage.setItem("Todo", JSON.stringify(storage));
        }
        if (activeList === "Completed") {
            if (editItemId) {
                temp = [...Completed];
                temp.find((item) => item._id === editItemId).name = val;
                setCompleted(temp);
                storage = temp;
            } else {
                setCompleted([...Completed, newData]);
                storage = [...Completed, newData];
            }
            localStorage.setItem("Completed", JSON.stringify(storage));
        }
        if (activeList === "Done") {
            if (editItemId) {
                temp = [...Done];
                temp.find((item) => item._id === editItemId).name = val;
                setDone(temp);
                storage = temp;
            } else {
                setDone([...Done, newData]);
                storage = [...Done, newData];
            }
            localStorage.setItem("Done", JSON.stringify(storage));
        }
        if (!editItemId) {
            setId((id) => id + 1);
            localStorage.setItem("id", id + 1);
        }
        close();
    };
    const deleteItem = (container, id) => {
        let temp;
        if (container === "Todo") {
            temp = [...Todo];
            temp = temp.filter((item) => item._id !== id);
            setTodo(temp);
            localStorage.setItem("Todo", JSON.stringify(temp));
        }
        if (container === "Completed") {
            temp = [...Completed];
            temp = temp.filter((item) => item._id !== id);
            setCompleted(temp);
            localStorage.setItem("Completed", JSON.stringify(temp));
        }
        if (container === "Done") {
            temp = [...Done];
            temp = temp.filter((item) => item._id !== id);
            setDone(temp);
            localStorage.setItem("Done", JSON.stringify(temp));
        }
    };
    const dragEnd = ({ source, destination }) => {
        let selector = {
            Todo: [Todo, setTodo],
            Completed: [Completed, setCompleted],
            Done: [Done, setDone],
        };
        if (!destination) return null;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        )
            return null;

        let from = source.droppableId;
        let dest = destination.droppableId;

        let addData;
        let temp;

        temp = [...selector[from][0]];
        addData = temp.splice(source.index, 1);
        //call the set function
        selector[from][1](temp);
        //update local storage
        if (from === "Todo") localStorage.setItem("Todo", JSON.stringify(temp));
        if (from === "Completed")
            localStorage.setItem("Completed", JSON.stringify(temp));
        if (from === "Done") localStorage.setItem("Done", JSON.stringify(temp));

        temp = from !== dest ? [...selector[dest][0]] : temp;
        temp.splice(destination.index, 0, ...addData);
        //call the set function
        selector[dest][1](temp);
        //update local storage
        if (dest === "Todo") localStorage.setItem("Todo", JSON.stringify(temp));
        if (dest === "Completed")
            localStorage.setItem("Completed", JSON.stringify(temp));
        if (dest === "Done") localStorage.setItem("Done", JSON.stringify(temp));
    };
    useEffect(() => {
        let id = Number(localStorage.getItem("id"));
        let Todo = JSON.parse(localStorage.getItem("Todo"));
        let Completed = JSON.parse(localStorage.getItem("Completed"));
        let Done = JSON.parse(localStorage.getItem("Done"));

        if (id) setId(id);
        if (Todo?.length) setTodo(Todo);
        if (Completed?.length) setCompleted(Completed);
        if (Done?.length) setDone(Done);
    }, []);
    return (
        <DataContext.Provider
            value={{
                Todo,
                Completed,
                Done,
                open,
                close,
                activeList,
                setActiveList,
                addOrEditData,
                deleteItem,
                setEditItemId,
                editItemId,
            }}
        >
            <DragDropContext onDragEnd={dragEnd}>
                <div className="container">
                    <h2>Trello clone</h2>
                    <Model isOpen={isOpen} />
                    <div className="rootToDoContainer">
                        <ListContainers name="Todo" />
                        <ListContainers name="Completed" />
                        <ListContainers name="Done" />
                    </div>
                </div>
            </DragDropContext>
        </DataContext.Provider>
    );
};

export default App;
