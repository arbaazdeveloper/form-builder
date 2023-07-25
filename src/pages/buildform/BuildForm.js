import React, { useState } from 'react'
import CreateForm from './createForm'
import { Link } from 'react-router-dom'



const BuildForm = () => {
 const [state,setState]=useState(false)
  return (
    <div>

      {/* {!state?<div className='flex flex-col cursor-pointer' onClick={()=>setState(true)}>
       <div className='border w-[100px] h-[100px] flex items-center'>
            <img src='https://ssl.gstatic.com/docs/templates/thumbnails/forms-blank-googlecolors.png' alt='plus'/>
        </div>
        <h3 className='text-center'>Blank</h3>
      </div>:<CreateForm />} */}
      <Link to='/create-form'>
      <div className='flex flex-col cursor-pointer'>
       <div className='border w-[100px] h-[100px] flex items-center'>
            <img src='https://ssl.gstatic.com/docs/templates/thumbnails/forms-blank-googlecolors.png' alt='plus'/>
        </div>
       </div>
      </Link>

    </div>
  )
}

export default BuildForm