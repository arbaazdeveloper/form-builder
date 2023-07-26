import React from 'react'

import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location=useLocation();
  
  return (
    <div className='w-[100vw] h-[100px]  flex justify-center  items-center sm:w-full sm:m-auto'>
        <div className='flex bg-[#f0f0ef] p-[10px] rounded w-[60%] justify-center gap-[10px]'>
        <Link to='/'>
        <button className={location.pathname==='/'||location.pathname==='/create-form'?'bg-themeColor p-[5px] rounded text-[#fff]':'bg-[#fff] p-[5px] rounded text-themeColor transition delay-150 hover:bg-themeColor hover:text-[#fff]'} >Create Form</button>
        </Link>
        <Link to='/edit-form'>
        <button className={location.pathname.includes('/edit-form')?'bg-themeColor p-[5px] rounded text-[#fff]':'bg-[#fff] p-[5px] rounded text-themeColor transition delay-150 hover:bg-themeColor hover:text-[#fff]'} >Edit Form</button>
        </Link>
        <Link to='/responses'>
        <button className={location.pathname.includes('/responses')?'bg-themeColor p-[5px] rounded text-[#fff]':'bg-[#fff] p-[5px] rounded text-themeColor transition delay-150 hover:bg-themeColor hover:text-[#fff]'}>View responses</button>
        </Link>
        </div>

    </div>
  )
}

export default Navbar