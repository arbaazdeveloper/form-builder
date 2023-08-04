import React from 'react'

const Clozeresponse = ({question,answer}) => {
   
    const AnswerContainer=({ans})=>{
        return<>
        <span className='p-2 bg-blue-500 w-[100px]'>{ans} </span>
        </>
    }

    const getAnswer=()=>{
        const sentence=question.sentence.split(' ')
        return (<>
        {
            sentence.map((word,index)=>{
                if(question.selectedWords.includes(word)){
              
                    return (<AnswerContainer ans={answer.answers[index]}/>)
    
                }else{
                    return word+' '
                }
            })
        }
        </>)
    }
    
  return (
    <div>

        <p>{question.sentence}</p>
        <div>{getAnswer()}</div>
    </div>
  )
}

export default Clozeresponse