import React from 'react'
import BuildForm from '../pages/buildform/BuildForm'
import EditForm from '../pages/EditForm'

const Navbar = ({setComponent}) => {
  return (
    <div className='h-[100px]  flex justify-center w-full items-center'>
        <div className='flex bg-[#f0f0ef] p-[10px] rounded w-[60%] justify-center gap-[10px]'>
        <button className='bg-themeColor p-[5px] rounded text-[#fff]' onClick={()=>setComponent(<BuildForm/>)}>Create Form</button>
        <button className='bg-[#fff] p-[5px] rounded text-themeColor transition delay-150 hover:bg-themeColor hover:text-[#fff]' onClick={()=>setComponent(<EditForm/>)}>Edit Form</button>
        <button className='bg-[#fff] p-[5px] rounded text-[#9a6afd]' onClick={()=>setComponent(<EditForm/>)}>View Forms</button>
        </div>

    </div>
  )
}

export default Navbar