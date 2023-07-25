import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { url } from '../../urls/BackendUrls';

const ViewResponse = () => {
    const [formResponse, setFormResponse] = useState([{response:[{key:'',value:''}]}]);
    const [found, setFound] = useState(true);
    const id = useParams();
   

    useEffect(() => {
        const getResponse = async () => {
            const res = await fetch(`${url}/get-response/${id.id}`)
            const data = await res.json();
            if (data.message === 'No Response Found For This Form') {
                setFound(false)
                return
            }
            setFormResponse(data);
          
        }
        getResponse()

    }, [])
    return (

        <div className="relative overflow-x-auto w-full">
            {!found && <h1 className='text-[30px] text-center'>No Responses Found</h1>}
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {formResponse[0].response.map((item) => {
                            return <th scope="col" className="px-6 py-3">
                                {item.key}
                            </th>
                        })}

                    </tr>
                </thead>
                <tbody>
                    {formResponse.map((item) => {
                        return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            {item.response.map((element) => {
                                return <td className="px-6 py-4">
                                    {element.value}
                                </td>
                            })}

                        </tr>
                    })}


                </tbody>
            </table>
        </div>

    )
}

export default ViewResponse