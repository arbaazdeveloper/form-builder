import React from 'react'

const Description = ({value,onChange}) => {
    return (
        <div className="mt-4">
            <p className="text-xs mb-1">Description</p><textarea value={value} onChange={onChange} type="text" id="description" placeholder="Enter Description" className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none" rows="4"></textarea>
        </div>
    )
}

export default Description