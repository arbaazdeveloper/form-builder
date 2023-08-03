import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { toast } from 'react-hot-toast'

const ClozeRederer = ({ data, setForm, form, elementIndex,extrasResponse,setExtraResponse }) => {
    const [filler, setFiller] = useState([])
    const [filledWord,setFilledWords]=useState([])
    const [show,setShow]=useState([])


    useEffect(() => {
        setFiller(data.sentence.split(' '))
        const empty=[]
        empty.fill(false,0,filler.length)
        setShow(empty)
        const emptywords=[]
        emptywords.fill('empty',0,filler.length)
        setFilledWords(emptywords)

    }, [])

    const fillBlank=(result)=>{
        if(!result.destination){
            return toast.error('Please drop at propper place !')
        }
        const wordIndex=parseInt(result.destination.droppableId)
        let prev=[...show]
        prev[wordIndex]=true
        setShow(prev)
        let prevWords=[...filledWord]
        prevWords[wordIndex]=result.draggableId
        setFilledWords(prevWords) 
    }
    useEffect(()=>{
        let previousResponses=[...extrasResponse]
        let filtered=filledWord.filter((item)=>item !=='empty')
        previousResponses[elementIndex]={answers:filtered}
        setExtraResponse(previousResponses)

    },[filledWord])
    return (
        <div className='w-full'>
            <DragDropContext onDragEnd={fillBlank}>
                <div className='flex gap-[10px]'>
                    <Droppable droppableId='source'>

                        {(provided) => (
                            <div  
                            {...provided.droppableProps} ref={provided.innerRef}
                            className='flex gap-[10px]'
                            >
                                {data.selectedWords.map((word, wordIndex) => {
                                    return <Draggable key={word} draggableId={word} index={wordIndex}>
                                        {(provided) => (
                                            <div className='bg-lightBlue text-center text-white bg-opacity-70 p-4 rounded'
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                {word}
                                            </div>
                                        )}
                                    </Draggable>

                                })}
                                {provided.placeholder}
                            </div>



                        )}


                    </Droppable>
                </div>
                <div className='flex flex-wrap items-center gap-[3px] w-full my-4'>
                    {filler.map((word,wordIndex) => {
                   
                        if (data.selectedWords.includes(word)) {
                            return <>
                                <Droppable droppableId={`${wordIndex}`}>
                                    {(provided)=>(
                                        <div className='h-[50px] w-[200px] bg-black rounded bg-opacity-50'
                                        {...provided.droppableProps} ref={provided.innerRef}
                                        >
                                          {show[wordIndex] && <div className='h-full w-full bg-blue-700 rounded flex items-center justify-center text-white text-center'>{filledWord[wordIndex]}</div>}
                                        {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                             
                            </>
                        } else {
                            return word + ' '
                        }
                    })}
                </div>

            </DragDropContext>
        </div>
    )
}

export default ClozeRederer