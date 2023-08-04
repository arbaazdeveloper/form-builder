import React from 'react'
import { GridIcon } from '../../assets/Icons'
import Input from '../Input'
import { Draggable } from 'react-beautiful-dnd'
import Drag from '../Drag'
import { v4 as uuidv4 } from 'uuid';


const MCQ = ({ questionText, options, onChange, onDragEnd, setState, currentState, index }) => {
    const handleOnDragEnd = (result) => {

        if (!result.destination) return;
        const items = Array.from(options);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        let copyQuestion = [...currentState.subQuestions]
        copyQuestion[index].options = items;
        setState({ ...currentState, subQuestions: copyQuestion })


    }
    const handleOptionOnChange = (e, optionIndex) => {
        let copyQuestion = [...currentState.subQuestions]
        copyQuestion[index].options[optionIndex].text = e.target.value;
        setState((prevState) => ({
            ...prevState,
            subQuestions: copyQuestion,
        }));

    }
    const addOption = () => {
        const uniqueId = uuidv4()
        const newOption = { id: uniqueId, text: 'new option' }
      
        let prevOption = [...options]
        prevOption = prevOption.concat(newOption);
        const prevSubquestion = [...currentState.subQuestions]
        prevSubquestion[index].options = prevOption
        setState({ ...currentState, subQuestions: prevSubquestion })



    }
    const questionChange=(e,index)=>{
        let previous=[...currentState.subQuestions]
        previous[index].questionText=e.target.value
        setState({...currentState, subQuestions:previous})

    }


    return (
        <div >
            <p>{questionText}</p>
            <Input value={questionText} onChange={(e)=>questionChange(e,index)} />
            <Drag onDragEnd={handleOnDragEnd}>
                {options.map((item, index) => {
                    return <>
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided) => (
                                <div className='flex items-center gap-2 m-2'
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}

                                >
                                    <button className='text-grey'><GridIcon /></button>
                                    <input id="default-radio-1" type="radio" value={''} onChange={onChange} name={''} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <input className='p-2 border border-grey-500' value={item.text} placeholder='option' onChange={(e) => handleOptionOnChange(e, index)} />
                                </div>
                            )}
                        </Draggable>

                    </>
                })}
            </Drag>
            <button className='border p-2' onClick={addOption}>Add option</button>

        </div>
    )
}

export default MCQ