import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';


const CategorizeRenderer = ({ data,setForm,form,elementIndex ,extrasResponse,setExtraResponse}) => {
    const [state, setState] = useState({ category1: [], category2: [] });
    useEffect(()=>{
        let previousResponses=[...extrasResponse]
        previousResponses[elementIndex]=state
        setExtraResponse(previousResponses)

    },[state])
    

    const settleCategory = (result) => {
        if(!result.destination){
            return
        }
     
     
    
        if(result.destination.droppableId==="destination2"){
       
            const element=data.items.find((i)=>i.id===result.draggableId)
            const prev=[...state.category2, element]
            setState({...state,category2:prev})
            const filterOut=data.items.filter((item)=>item.id !== result.draggableId )
            let newArray=[...form.extras];
            newArray[elementIndex].items=filterOut
            setForm({...form,extras:newArray})



        }
        if(result.destination.droppableId==="destination1"){
         
            const element=data.items.find((i)=>i.id===result.draggableId)
            const prev=[...state.category1, element]
            setState({...state,category1:prev})
            const filterOut=data.items.filter((item)=>item.id !== result.draggableId )
            let newArray=[...form.extras];
            newArray[elementIndex].items=filterOut
            setForm({...form,extras:newArray})

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
                                    <div className='h-full w-full '>
                                        <Droppable droppableId={`${index===0?'destination1':'destination2'}`}>
                                            {(provided) => (
                                                <div className=' h-full w-full z-10' {...provided.droppableProps} ref={provided.innerRef}>
                                                    <div className=''>
                                                    {index===0&&state.category1.map((item)=>{
                                                        return <div className='border border-[#000] rounded rounded-[10px] p-3 bg-white'>
                                                           
                                                            {item.itemName}
                                                        </div>
                                                    })}
                                                    {index===1&&state.category2.map((item)=>{
                                                        return <div className='border border-[#000] rounded rounded-[10px] p-3 bg-white'>
                                                                       
                                                                      {item.itemName}
                                                        </div>
                                                    })}
                                                    </div>

                                                    {provided.placeholder}
                                                </div>
                                            )}

                                        </Droppable>


                                    </div>
                      

                                </div>
                               
                            </div>
                        );
                    })}
                </div>
            </DragDropContext>

        </div>
    );
};

export default CategorizeRenderer;