import React from 'react'

const Lightbutton = ({text,onClick,icon}) => {
    return (
        <button onClick={onClick} type="button"className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center no:focus:ring-gray-600 no:bg-gray-800 no:border-gray-700 no:text-white no:hover:bg-gray-700 mr-2 mb-2">
         
            {text}
            <span className='text-[10px]'>{icon}</span>
            
        </button>
    )
}

export default Lightbutton