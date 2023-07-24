import React, { useState } from 'react'
import CreateForm from './createForm'



const BuildForm = () => {
 const [state,setState]=useState(false)
  return (
    <div className='flex  w-[60%] m-auto'>

      {!state?<div className='flex flex-col cursor-pointer' onClick={()=>setState(true)}>
       <div className='border w-[100px] h-[100px] flex items-center'>
            <img src='https://ssl.gstatic.com/docs/templates/thumbnails/forms-blank-googlecolors.png' alt='plus'/>
        </div>
        <h3 className='text-center'>Blank</h3>
      </div>:<CreateForm />}

    </div>
  )
}

export default BuildForm