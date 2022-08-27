import { useContext, useRef } from "react";
import Modal from "react-modal";
import { DataContext } from "../context/DataContext";
import Close from "../svg/Close";

Modal.setAppElement("#root");

const Model = ({ isOpen }) => {
    let dataContext = useContext(DataContext);
    let ref = useRef();
    const handleClick = () => {
        if ((ref.current.value === "") | " ") {
            alert("Type something!");
            return null;
        }
        dataContext.addOrEditData(ref.current.value);
    };

    return (
        <Modal isOpen={isOpen} shouldCloseOnOverlayClick={false}>
            <div className="modal">
                <h4>{dataContext.editItemId ? `Edit item` : `Add item`}</h4>

                <input type="text" placeholder="Enter item name" ref={ref} />
                <div>
                    <button type="button" onClick={handleClick}>
                        {dataContext.editItemId ? `Edit` : `Add`}
                    </button>
                </div>
                <Close close={() => dataContext.close()} />
            </div>
        </Modal>
    );
};

export default Model;
