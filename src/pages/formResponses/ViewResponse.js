import React, { useEffect, useState } from 'react'

import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { frontEnd, url } from '../../urls/BackendUrls';
import Modal from '../../components/Modal';
import Lightbutton from '../../components/Lightbutton';

const ViewResponse = () => {
    const [formResponse, setFormResponse] = useState([{ response: [{ key: '', value: '' }] }]);
    const [found, setFound] = useState(true);
    const formId = useParams();
    const [isOpen,setIsOpen]=useState(false);
    const handleModal=()=>{
       
        if(isOpen){

            setIsOpen(false)
        }else{
            setIsOpen(true)
        }
    }
    const handleCopy=()=>{
       navigator.clipboard.writeText(`${frontEnd}/view-form/${formId.id}`)
       toast.success('Copied to clipboard !')

    }


    useEffect(() => {
        const getResponse = async () => {
            try {
                const res = await fetch(`${url}/get-response/${formId.id}`)
                const data = await res.json();
                if (data.message === 'No Response Found For This Form') {
                    setFound(false)
                    return
                }
                setFormResponse(data);
            } catch (error) {
                toast.error('Something Went Wrong !')
            }


        }
        getResponse();
       

    }, [formId.id])
    return (

    <div>

        <div className="relative overflow-x-auto w-full">
            {!found && <h1 className='text-[30px] text-center'>No Responses Found</h1>}
            <table className="w-full text-sm text-left text-gray-500 no:text-gray-400 overflow-auto">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 no:bg-gray-700 no:text-gray-400 w-[200px]">
                    <tr>
                        
                        {formResponse[formResponse.length-1].response.map((item) => {
                           
                            return <th scope="col" className="px-6 py-3 w-[300px]">
                                {item.key}
                            </th>
                        })}

                    </tr>
                </thead>
                <tbody>
              
                    {formResponse.map((item) => {
                        
                        return <tr className="bg-white border-b ">
                            {item.response.map((element,index) => {
                               
                                return <td className="px-6 py-4">
                                    {element.value}
                                </td>
                                
                            })}

                        </tr>
                    })}


                </tbody>
            </table>
            <Modal isOpen={isOpen} onClose={handleModal}>
                <div className='w-[400px] border-b border-t flex flex-col py-2 my-4'>
                    <input type='text' className='p-2 border rounded m-2' readOnly value={`${frontEnd}/view-form/${formId.id}`} />

                    <div className='flex gap-[5px] '>
                        <button onClick={handleCopy} type="button" className="px-5 mb-2 py- text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center no:bg-blue-600 no:hover:bg-blue-700 no:focus:ring-blue-800">Copy</button>
                        <Lightbutton text={'Cancel'} onClick={handleModal}></Lightbutton>
                    </div>
                </div>

            </Modal>
            <div className='my-4'>

            <Lightbutton text={'Share Form'} onClick={handleModal}></Lightbutton>
            </div>

        </div>
            <div className='flex justify-center'>
                <Link className='bg-themeColor p-4 rounded rounded-[10px] text-white' to={`/full-response/${formId.id}`}>View full responses</Link>

            </div>
    </div>

    )
}

export default ViewResponse