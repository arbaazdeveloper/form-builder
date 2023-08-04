import React, { useEffect, useState } from 'react'
import useDeleteRequest, { useGetRequest, usePutRequest } from '../../hooks/useApiCalls'
import { useNavigate, useParams } from 'react-router-dom'
import FormBuilder from '../buildform/FormBuilder';
import { toast } from 'react-hot-toast';
import Modal from '../../components/Modal';
import Lightbutton from '../../components/Lightbutton';

const Editor = () => {
    const id = useParams();
    const schema = { title: 'Loading..',image:'Loading', description: '', elements: [{ type: 'text', label: '', options: [] }] }
    const [form, setForm] = useState(schema)
    const [getRequest, error] = useGetRequest(`/get-form/${id.id}`);
    const [putRequest, err] = usePutRequest(`/update-form/${id.id}`, form);
    const [deleteError, deleteIsLoading, deleteRequest]=useDeleteRequest();
    const [open, setOpen] = useState(false);
    const navigate=useNavigate()

    const handleUpdate = async () => {
        for (let i = 0; i < form.elements.length; i++) {
            if (form.elements[i].label === '') {
                toast.error('Question Cannot be empty !')
                return
            }
        }
     

        toast('Saving...')
        const response = await putRequest();


        if (err) {
         
            return toast.error('Something Went Wrong !')
        }




        if (response.message === 'form updated') {
            toast.success('form updated sucessfully !')
        }
    }
    const handleOpenModal = () => {
        if (!open) {
            setOpen(true)
        } else {
            setOpen(false)
        }

    }
    const handleDelete= async()=>{
       const isDeletedData= await deleteRequest(`/delete-form/${id.id}`)
    
        if(deleteIsLoading){
            toast('Deleting form ...')
        }
        if(deleteError){
            toast.error('something went wrong !')
        }
        if(isDeletedData.data.message==='form deleted'){
            navigate('/edit-form')

        }

    }




    useEffect(() => {
        const getForm = async () => {
            const response = await getRequest();
            if (error) {
                toast.error('Something Went Wrong!')
            }
            setForm(response)
        }
        getForm()
    }, [])// eslint-disable-line react-hooks/exhaustive-deps
    return (
        <>
            <div className='w-full'>
                <FormBuilder form={form}  setForm={setForm} onSave={handleUpdate} lightBtnText={'Delete'} onLightBtn={handleOpenModal} image={'not allowed'} builderType={'edit'}/>
                <Modal isOpen={open} onClose={handleOpenModal}>
                    <div className='w-[400px] border-b border-t flex flex-col py-2 my-4'>
                        <p className='py-4'>Are You Sure You Want To Delete this form !</p>

                        <div className='flex gap-[5px] '>
                            <button onClick={handleDelete} type="button" className="px-5 mb-2 py- text-sm font-medium text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Delete</button>
                            <Lightbutton text={'Cancel'} onClick={handleOpenModal}></Lightbutton>
                        </div>
                    </div>

                </Modal>
            </div>
        </>
    )
}

export default Editor