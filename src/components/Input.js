import React from 'react'

const Input = ({value,onChange,label,isMandatory}) => {
  return (
    <div className="">
        <p className="text-xs mb-1">{label}{isMandatory&&<span className="text-red-500">*</span>}</p> 
        <input type="text" id="name" placeholder="Enter name" className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none" value={value} onChange={onChange} />
    </div>
  )
}

export default Input