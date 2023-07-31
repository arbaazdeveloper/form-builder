import React, { useState } from 'react'
import MCQ from './MCQ'
import Lightbutton from '../Lightbutton'

const Comprehension = () => {
  const [state, setState] = useState({ passage: '', subQuestions: [{ questionText: 'Question', options: [{ id: '1', text: 'one' }, { id: '2', text: 'two' }] }] })
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const addMcq = () => {
    const subQuestionShema = { questionText: 'Question', options: [{ id: '1', text: 'one' }, { id: '2', text: 'two' }] }
    let prevQuestion = state.subQuestions;
    prevQuestion = prevQuestion.concat(subQuestionShema)
    setState({ ...state, subQuestions: prevQuestion })
  }
  const handleOnDragEnd = (result) => {

    if (!result.destination) return;
    const items = Array.from(state.subQuestions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setState({ ...state, options: items });
   

  }

  return (
    <>
      <textarea className='mt-2 border border-gray-300 p-2 w-full rounded' name='passage' onChange={handleChange} value={state.passage} placeholder='Type Passage Here'>
      </textarea>
           <h1 className='text-black text-[25px] text-center'>MCQ Questions</h1>
      {state.subQuestions.map((item, index) => {
        return <>
          <div className='m-auto w-[80%] bg-white p-4 rounded mt-2'>
            <MCQ questionText={item.questionText} index={index} options={item.options} onDragEnd={handleOnDragEnd} setState={setState} currentState={state} />
          </div>
        </>
      })}

      <div className='flex w-full justify-center m-2'>

        <Lightbutton text='Add MCQ' onClick={addMcq}></Lightbutton>
      </div>



    </>
  )
}

export default Comprehension