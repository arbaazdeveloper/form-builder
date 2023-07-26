import React from 'react'

import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location=useLocation();
  
  return (
    <div className='h-[100px]  flex justify-center w-full items-center'>
        <div className='flex bg-[#f0f0ef] p-[10px] rounded w-[60%] justify-center gap-[10px]'>
        <Link to='/'>
        <button className={location.pathname==='/'?'bg-themeColor p-[5px] rounded text-[#fff]':'bg-[#fff] p-[5px] rounded text-themeColor transition delay-150 hover:bg-themeColor hover:text-[#fff]'} >Create Form</button>
        </Link>
        <Link to='/edit-form'>
        <button className={location.pathname==='/edit-form'?'bg-themeColor p-[5px] rounded text-[#fff]':'bg-[#fff] p-[5px] rounded text-themeColor transition delay-150 hover:bg-themeColor hover:text-[#fff]'} >Edit Form</button>
        </Link>
        <Link to='/responses'>
        <button className={location.pathname==='/responses'?'bg-themeColor p-[5px] rounded text-[#fff]':'bg-[#fff] p-[5px] rounded text-themeColor transition delay-150 hover:bg-themeColor hover:text-[#fff]'}>View responses</button>
        </Link>
        </div>

    </div>
  )
}

export default Navbar