import React from 'react'

import { Link } from 'react-router-dom'



const BuildForm = () => {

  return (
    <div>

  
      <Link to='/create-form'>
      <div className='flex flex-col cursor-pointer'>
       <div className='border w-[100px] h-[100px] flex items-center'>
            <img src='https://ssl.gstatic.com/docs/templates/thumbnails/forms-blank-googlecolors.png' alt='plus'/>
        </div>
        <h1 className='text-center'>Blank</h1>
       </div>
      </Link>

    </div>
  )
}

export default BuildForm