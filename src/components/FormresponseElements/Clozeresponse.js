import React from 'react'

const Clozeresponse = ({question,answer}) => {
    console.log(question)
    console.log(answer)
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
                    console.log(answer.answers[index])
                    return (<AnswerContainer ans={answer.answers[index]}/>)
    
                }else{
                    return word+' '
                }
            })
        }
        </>)
    }
    console.log(getAnswer())
  return (
    <div>

        <p>{question.sentence}</p>
        <div>{getAnswer()}</div>
    </div>
  )
}

export default Clozeresponse