import React from 'react'

const NotFound = () => {
  return (
    <div className='flex flex-col h-[80vh] justify-center items-center'>
        <img src='https://static.thenounproject.com/png/4147389-200.png' alt='not found'/>
        <h1 className='text-[30px]'>404</h1>
        <h1 className='text-[30px]'>Not Found</h1>
        <p className='text-[20px]'>Look like page does not exist you are looking for !</p>
    </div>
  )
}

export default NotFound