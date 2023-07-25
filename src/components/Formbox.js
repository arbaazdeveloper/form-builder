import React from 'react'
import Button from './Button'

const Formbox = ({title, button, onClick}) => {
  return (
    <div className='bg-lighColor flex w-full p-4 items-center justify-between rounded-[10px]'>
        <div>
            <h1>{title}</h1>
        </div>
        <div>
            <Button onClick={onClick} text={button}/>
        </div>
    </div>
  )
}

export default Formbox