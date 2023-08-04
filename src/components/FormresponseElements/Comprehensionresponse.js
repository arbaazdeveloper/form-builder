import React from 'react'

const Comprehensionresponse = ({question,answer}) => {
 
  return (
    <div>

        {answer.mcqAnswers.map((item,index)=>{

            return <>
              <div className='bg-white p-4 my-3 rounded'>
                <p>{item.question}</p>
                 {question.subQuestions[index].options.map((option)=>{
                    return   <div className="flex items-center mb-4">
                    
                    <input id="default-radio-1" type="radio" value={option.text} name={`${item.question}`} defaultChecked   className="w-4 cursor-not-allowed h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="default-radio-1" className="ml-2 text-sm font-medium text-black-900 ">{option.text}</label>
                </div>

                 })}
              </div>
            </>
        })}
    </div>
  )
}

export default Comprehensionresponse