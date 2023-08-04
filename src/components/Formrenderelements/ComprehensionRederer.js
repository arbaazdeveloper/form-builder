import React, { useEffect, useState } from 'react'
import RadioGroup from '../form-elements/RadioGroup'

const ComprehensionRederer = ({data, form, setForm, elementIndex,extrasResponse,setExtraResponse}) => {
  const [state,setState]=useState({mcqAnswers:[]})
  useEffect(()=>{
      if(data.subQuestions.length===state.mcqAnswers.length){
        return
      }
      for(let i=0; i<data.subQuestions.length; i++){
     
        const currentQuestion = { question: data.subQuestions[i].questionText, answer: '' };
        setState((previousState) => ({
          ...previousState,
          mcqAnswers: [...previousState.mcqAnswers, currentQuestion],
        }));
      
    }

  },[]);
  const handleAnswerChange=(e,questionIndex)=>{
    const ans=e.target.value;
    let previous=[...state.mcqAnswers]
    previous[questionIndex].answer=ans;
    setState({...state, mcqAnswers:previous})

  

    
  }
   useEffect(()=>{
    let previousResponses=[...extrasResponse]
    previousResponses[elementIndex]=state
    setExtraResponse(previousResponses)
   },[state])

  return (
    <div className='w-full'>
      <div className='bg-white p-2 border border-black-500 rounded rounded-[10px]'>

      <h3 className='text-black-900 text-[20px]'>The Passage</h3>
      <p><i>{data.passage}</i></p>
      </div>
      <h1 className='text-center my-2 text-[20px]'>MCQs</h1>
      <div className='flex flex-col justify-center m-2 w-full items-center'>

        {data.subQuestions.map((question,questionIndex)=>{
          return<div className='bg-white p-2 border border-black-500 rounded rounded-[10px] my-2 w-[90%]'>
               <p>Q {elementIndex+1}.{questionIndex+1} {question.questionText}</p>

               <div>

                
                {question.options.map((item) => <>
                <div className="flex items-center mb-4">

                    <input id="default-radio-1" type="radio" value={item.text} onChange={(e)=>handleAnswerChange(e,questionIndex)} name={`${question.questionText}`}  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="default-radio-1" className="ml-2 text-sm font-medium text-black-900 ">{item.text}</label>
                </div>
            </>)}
                  
                </div>

          </div>
        })}
      

      </div>
    </div>
  )
}

export default ComprehensionRederer