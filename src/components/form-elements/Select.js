import React from 'react'

const Select = ({ label, values, options, onChange}) => {
    return (
        <>
            <p className='mb-[10px]'>{label}</p>
            <label for="sel" className="block mb-2 text-sm font-medium text-gray-900 no:text-white">Select an option</label>
            <select onChange={onChange} id="sel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 no:bg-gray-700 no:border-gray-600 no:placeholder-gray-400 no:text-white no:focus:ring-blue-500 no:focus:border-blue-500">
                <option selected>Choose</option>
                {options.map((item) => <option className='text-[#000]' value={item}>{item}</option>)}

            </select>
        </>
    )
}

export default Select