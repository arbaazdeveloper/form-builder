import React from 'react'
import { DragDropContext, Droppable} from "react-beautiful-dnd";
const Drag = ({ children, onDragEnd }) => {
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="source">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                         {children}
                         {provided.placeholder}
                    </div>)}
            </Droppable>
        </DragDropContext>
    )
}

export default Drag