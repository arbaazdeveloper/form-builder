import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Thankspage = () => {
    const id=useParams();
  return (
    <div className='flex flex-col items-center justify-center h-[80vh]'>
        <h1 className='text-[30px]'>Thankyou for your response</h1>
        <h2>We have Recorded you response</h2>
        <Link to={`/view-form/${id.id}`}>
            <button className='border rounded p-2 m-2 bg-lighColor'>Give Another Response</button>
        </Link>
    </div>
  )
}

export default Thankspage