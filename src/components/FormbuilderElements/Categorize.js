import React, { useEffect, useState } from 'react'
import { GridIcon } from '../../assets/Icons'
import Drag from '../Drag'
import { Draggable } from 'react-beautiful-dnd'
import { v4 as uuidv4 } from 'uuid'

const Categorize = ({form,setForm,elementIndex}) => {
    const categorizeSchema = { categories: [{ id: 'one', categoryName: '' }, { id: 'two', categoryName: '' }], items: [{ id: 'one', itemName: '', belongsTo: '' }, { id: 'two', itemName: '', belongsTo: '' }] }
    const [state, setState] = useState(categorizeSchema);
    const handleItemNameChange = (e, nameIndex) => {
        let copiedItems = [...state.items]
        copiedItems[nameIndex].itemName = e.target.value
        setState({ ...state, items: copiedItems })
    }
    const handleItemBelongChange = (e, belongsToIndex) => {
        let copiedItems = [...state.items];
        copiedItems[belongsToIndex].belongsTo = e.target.value
        setState({ ...state, items: copiedItems })

    }
    const handleCategoryNameChange = (e, nameIndex) => {
        let copiedCategories = [...state.categories]
        copiedCategories[nameIndex].categoryName = e.target.value;
        setState({ ...state, categories: copiedCategories })

    }
    const itemDragChange = (result) => {
        if (!result.destination) return;
        const items = Array.from(state.items);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setState({ ...state, items: items })

    }
    const categoryDragChange = (result) => {
        if (!result.destination) return;
        const items = Array.from(state.categories);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setState({ ...state, categories: items })

    }
    const addItem = () => {
        const uniqueItemId = uuidv4()
        const newItem = { id: uniqueItemId, itemName: '', belongsTo: '' }
        let copiedItems = [...state.items]
        copiedItems = copiedItems.concat(newItem)
        setState({ ...state, items: copiedItems })

    }
    useEffect(()=>{
        let previous=[...form.extras]
        previous[elementIndex]=state
        setForm({...form,extras:previous})
    },[state])
    return (
        <>
            <div className='flex flex-col gap-[10px]'>
                <h1>Categories</h1>
                <Drag onDragEnd={categoryDragChange}>

                    {state.categories.map((category, index) => {
                        return <Draggable key={category.id} draggableId={category.id} index={index} >
                            {(provided) => (
                                <div className='flex gap-[10px]' key={category.id}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}

                                >
                                    <button> <GridIcon /></button>
                                    <input className='border p-2 border-grey-500 w-[200px] m-1' onChange={(e) => handleCategoryNameChange(e, index)} placeholder='type category here' value={category.categoryName} />
                                </div>
                            )}

                        </Draggable>

                    })}
                </Drag>



                <div className='mt-10'>
                    <div className='w-[40%] flex justify-between gap-[10px]'>
                        <h1>Items</h1>
                        <h1>Belongs to</h1>
                    </div>
                    <Drag onDragEnd={itemDragChange}>
                        {state.items.map((element, index) => {
                            return <Draggable key={element.id} draggableId={element.id} index={index} >
                                {(provided) => (
                                    <div className='w-[50%] flex flex-col justify-between gap-[10px] sm:flex-row'
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <button><GridIcon /></button>
                                        <div>

                                            <input className='border p-2 border-grey-500' placeholder={`item ${index + 1}`} value={element.itemName} onChange={(e) => handleItemNameChange(e, index)} />
                                        </div>

                                        <div>

                                            <select className='p-3 mb-1 w-[200px] border border-grey-500' onChange={(e) => handleItemBelongChange(e, index)}>
                                                <option>Select</option>
                                                {state.categories.map((category) => <option key={category.id} value={category.categoryName}>{category.categoryName}</option>)}

                                            </select>
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        })}


                    </Drag>
                    <button onClick={addItem} className='p-2 bg-white border'>Add Item</button>
                </div>

            </div>
        </>
    )
}

export default Categorize