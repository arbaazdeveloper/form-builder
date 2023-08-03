import React from 'react'

const Categorizeresponse = ({question,answer}) => {
    console.log(question)
    console.log(answer)
  return (
    <div>
        <div className='flex justify-center gap-[10px]'>
            {question.categories.map((item,index)=>{
                return  <div
                className={`bg-${index === 0 ? 'lightBlue' : 'lightGreen'} p-4 px-4 rounded w-[200px] text-center`}
            >
                {item.categoryName}
                </div>
            })}
        </div>
        <div className='flex justify-center gap-[10px]  my-2'>
            <div className='bg-lightBlue p-2 rounded'>
            {answer.category1.map((category)=>{
                    return <div className='p-2 rounded rounded-[10px] border border-black-500 p-2 bg-white my-2'>{category.itemName}</div>
                })}

            </div>
            <div className='bg-lightGreen flex flex-col p-2 rounded'>
            {answer.category2.map((category)=>{
                    return <div className='p-2 rounded rounded-[10px] border border-black-500 p-2 bg-white my-2'>{category.itemName}</div>
                })}
            </div>
        </div>
    </div>
  )
}

export default Categorizeresponse