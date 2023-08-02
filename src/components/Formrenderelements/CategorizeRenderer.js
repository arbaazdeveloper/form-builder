import React, { useState, useRef } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Drag from '../Drag';

const CategorizeRenderer = ({ data }) => {
    const [state, setState] = useState({ category1: [{ id: 'testid', itemName: 'test' }], category2: [] });
    const [isDragging, setIsDragging] = useState(false);

    const droppableRef = useRef(null);
    const categoryRefs = {
        category1: useRef(null),
        category2: useRef(null),
    };

    const startDrag = () => {
        setIsDragging(true);
    };

    const settleCategory = (result) => {
        console.log(result)
        console.log('i ran')
        if (isDragging) {
            const { source, destination } = result;

            if (!destination) {
                setIsDragging(false);
                return;
            }

            //   const sourceCategory = data.categories[source.droppableId];
            //   const destinationCategory = data.categories[destination.droppableId];

            //   const sourceItems = [...state[sourceCategory.id]];
            //   const destinationItems = [...state[destinationCategory.id]];

            //   const [movedItem] = sourceItems.splice(source.index, 1);
            //   destinationItems.splice(destination.index, 0, movedItem);

            //   setState((prevState) => ({
            //     ...prevState,
            //     [sourceCategory.id]: sourceItems,
            //     [destinationCategory.id]: destinationItems,
            //   }));

            //   setIsDragging(false);
        }
    };

    return (
        <div>
            <DragDropContext onDragEnd={settleCategory}>
                <Droppable droppableId='source'>
                    {(provided) => (
                        <div className='flex justify-center gap-[10px]' {...provided.droppableProps} ref={provided.innerRef}>
                            {data.items.map((item, index) => {
                                return (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided) => (
                                            <div
                                                className='border border-[#000] rounded rounded-[10px] p-3 bg-white'
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                {item.itemName}
                                            </div>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    )}

                </Droppable>

                <div className='h-[100px] w-[400px] border'>
                    <Droppable droppableId='destination'>
                        {(provided) => (
                            <div className='border border-black h-[100px]' {...provided.droppableProps} ref={provided.innerRef}>

                                {provided.placeholder}
                            </div>
                        )}

                    </Droppable>


                </div>



                <div className='flex justify-center m-4 gap-[10px]'>
                    {data.categories.map((item, index) => {
                        return (
                            <div key={item.id}>
                                <div
                                    className={`bg-${index === 0 ? 'lightBlue' : 'lightGreen'} p-4 px-4 rounded w-[200px] text-center`}
                                >
                                    {item.categoryName}
                                </div>
                                <div
                                    className={`bg-${index === 0 ? 'lightBlue' : 'lightGreen'} my-4 h-[200px] w-[200px] rounded p-2`}
                                >
                                    <div className='h-[100px] w-[400px] border'>
                                        <Droppable droppableId='destination1'>
                                            {(provided) => (
                                                <div className='border border-black h-[100px] w-[200px] z-10' {...provided.droppableProps} ref={provided.innerRef}>

                                                    {provided.placeholder}
                                                </div>
                                            )}

                                        </Droppable>


                                    </div>
                                    {/* <Droppable droppableId='destination1'>
                    {(provided) => (
                      <div className='h-full border border-black' {...provided.droppableProps} ref={provided.innerRef}>
                        {index === 0 &&
                          state.category1.map((item, itemIndex) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={itemIndex}
                            >
                              {(provided) => (
                                <div
                                  className='border border-[#000] rounded rounded-[10px] p-3 bg-white text-center'
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {item.itemName}
                                </div>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable> */}

                                </div>
                                {index === 1 &&
                                    state.category2.map((item) => (
                                        <div
                                            key={item.id}
                                            className='border border-[#000] rounded rounded-[10px] p-3 bg-white text-center'
                                        >
                                            {item.itemName}
                                        </div>
                                    ))}
                            </div>
                        );
                    })}
                </div>
            </DragDropContext>

        </div>
    );
};

export default CategorizeRenderer;