import React from 'react'

const Header = () => {
  return (
    <div className='w-[80%] flex sm:w-[60%] m-auto items-center h-[120px] gap-[10px]'>
        <div className='bg-[#000] rounded-full'>

         <img className='h-[100px] w-[100px] rounded-full' src='https://res.cloudinary.com/dxknbk2hd/image/upload/v1690386765/Screenshot_2023-07-26_211534_1_njq0cq.png' alt='logo'/>
        </div>
        <h1 className='text-[40px] font-arial'>Form Builder</h1>
    </div>
  )
}

export default Header