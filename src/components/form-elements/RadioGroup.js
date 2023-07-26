import React from 'react'

const RadioGroup = ({ label, values, options ,onChange}) => {
    return (
        <div>
            <p className='mb-[10px]'>{label}</p>
            {options.map((item) => <>
                <div className="flex items-center mb-4">
                    <input id="default-radio-1" type="radio" value={item} onChange={onChange} name={label} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="default-radio-1" className="ml-2 text-sm font-medium text-black-900 ">{item}</label>
                </div>
            </>)}
        </div>
    )
}

export default RadioGroup